from django.contrib import admin
from .models import Profile
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from django import forms

class ProfileForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = '__all__'

class ProfileAdmin(admin.ModelAdmin):
    form = ProfileForm
    list_display = ('user', 'get_face_encoding_preview')

    def get_face_encoding_preview(self, obj):
        if obj.face_encoding:
            return "Encoding available"
        return "No encoding"
    get_face_encoding_preview.short_description = 'Face Encoding'

admin.site.register(Profile, ProfileAdmin)

# Перерегистрируем админку пользователя
admin.site.unregister(User)

class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False

class UserAdmin(BaseUserAdmin):
    inlines = (ProfileInline,)

admin.site.register(User, UserAdmin)
