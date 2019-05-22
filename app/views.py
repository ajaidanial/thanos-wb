from django.http import HttpResponse, JsonResponse
from django.template import loader
from django.views.decorators.csrf import csrf_exempt


def login(request):
    template = loader.get_template('login.html')
    context = {}
    return HttpResponse(template.render(context, request))


@csrf_exempt
def validate(request):
    if request.method == 'POST':
        t = request.POST
        print(t)
        if 'login' in request.POST:
            return JsonResponse({'success': True, 'form': 'login'})
        else:
            return JsonResponse({'success': True, 'form': 'signup'})
