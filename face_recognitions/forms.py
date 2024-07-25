from django import forms

class ProfileForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = '__all__'
        widgets = {
            'face_encoding': forms.HiddenInput(),  # Скрытое поле для face_encoding
        }

    def save(self, commit=True):
        instance = super().save(commit=False)
        image = self.cleaned_data.get('image')
        if image:
            instance.save_face_encoding(image)
        if commit:
            instance.save()
        return instance