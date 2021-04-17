from django import forms

class NameForm(forms.Form):
    name = forms.CharField(max_length=255)

class EmailForm(forms.Form):
    email = forms.CharField(max_length=255)