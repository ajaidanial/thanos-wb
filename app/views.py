from django.http import HttpResponse
from django.template import loader
from django.views.decorators.csrf import csrf_exempt


def login(request):
    template = loader.get_template('login.html')
    context = {}
    return HttpResponse(template.render(context, request))


@csrf_exempt
def validate(request):
    if request.method == 'POST':
        return HttpResponse("Hello World")
