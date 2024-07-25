import json

import numpy as np
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
import base64
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from PIL import Image
from io import BytesIO
import face_recognition
from face_recognitions.models import Profile


def index(request):
    if request.user.is_authenticated:
        profile = Profile.objects.get(user=request.user)
        return render(request, 'face_recognition/upload.html', {'profile': profile})
    return render(request, 'face_recognition/upload.html')


@csrf_exempt
def face_id_login(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            image_data = data['image'].split(',')[1]
            image = Image.open(BytesIO(base64.b64decode(image_data)))

            # Преобразование изображения в RGB формат
            if image.mode != 'RGB':
                image = image.convert('RGB')

            # Преобразование изображения в массив numpy
            image_array = np.array(image)

            # Получение лицевых характеристик
            face_encodings = face_recognition.face_encodings(image_array)

            if face_encodings:
                user_face_encoding = face_encodings[0]

                # Сравнение с лицевыми характеристиками пользователей из базы данных
                for profile in Profile.objects.all():
                    if profile.face_encoding:
                        known_face_encoding = np.frombuffer(profile.face_encoding, dtype=np.float64)
                        match = face_recognition.compare_faces([known_face_encoding], user_face_encoding, tolerance=0.5)  # Порог точности
                        face_distance = face_recognition.face_distance([known_face_encoding], user_face_encoding)[0]  # Расстояние лицевых характеристик

                        if match[0] and face_distance < 0.6:  # Проверка расстояния
                            # Аутентификация пользователя
                            user = profile.user
                            login(request, user)
                            return JsonResponse({'success': True, 'redirect_url': '/'})

                return JsonResponse({'success': False, 'error': 'Лицо не распознано'})

            return JsonResponse({'success': False, 'error': 'Лицо не найдено'})

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=400)
