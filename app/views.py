from django.http import HttpResponse, JsonResponse
from django.template import loader
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt

from app.models import User


def login(request):
    template = loader.get_template('login.html')
    context = {}
    return HttpResponse(template.render(context, request))


@csrf_exempt
def validate(request):
    if request.method == 'POST':
        if 'login' in request.POST:
            return JsonResponse({'success': True, 'form': 'login'})
        else:
            user_name = request.POST['username']
            first_name = request.POST['fname']
            last_name = request.POST['lname']
            password = request.POST['password']
            email_id = request.POST['email']

            if is_valid_sign_up(user_name):
                user = User(user_name=user_name, first_name=first_name, last_name=last_name, email_id=email_id,
                            password=password, created_date=timezone.now())
                user.save()
                return JsonResponse({'success': True})
            else:
                return JsonResponse({'success': False, 'unique_user': False})


def is_valid_sign_up(username: str):
    try:
        User.objects.get(user_name=username)
    except User.DoesNotExist:
        return True
    return False
