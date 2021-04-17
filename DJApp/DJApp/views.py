from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response

from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.contrib import messages
from django.shortcuts import render

from .models import PeopleModel
from .serializers import PeopleSerializer
from .forms import NameForm, EmailForm


class PeopleViewSet(viewsets.ModelViewSet):
    queryset = PeopleModel.objects.all()
    serializer_class = PeopleSerializer
    permission_classes = [AllowAny,]


def search(request):
    people = PeopleModel.objects.all()
    if request.method == 'POST':
        form = NameForm(request.POST)
        emailform = EmailForm(request.POST)

        if 'namesubmit' in request.POST:
            if form.is_valid():
                try:
                    names = form.cleaned_data['name']
                    search_target = people.filter(name=names)
                    messages.info(request,"User e-mail: "+search_target.get().email)
                except Exception as e:
                    messages.error(request,"Name not found!")

        elif 'emailsubmit' in request.POST:
            if emailform.is_valid():
                try:
                    email = emailform.cleaned_data['email']
                    search_target = people.filter(email=email)
                    messages.info(request,"User Name: "+search_target.get().name)
                except Exception as e:
                    messages.error(request,"Email not found!")

        return HttpResponseRedirect(request.path_info)

    else:
        form = NameForm()
        emailform = EmailForm()
    return render(request, 'people.html',  {'form': form, 'emailform': emailform, 'peoples': people})

