from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.template import loader
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt

from app.models import User


def login(request):
    if is_session_present(request):
        return HttpResponseRedirect('/chat')
    template = loader.get_template('login.html')
    context = {}
    return HttpResponse(template.render(context, request))


@csrf_exempt
def validate(request):
    if request.method == 'POST':
        if 'login' in request.POST:
            user_name = request.POST['username']
            password = request.POST['password']
            if is_valid_sign_in(username=user_name, password=password):
                return JsonResponse({'success': True})
            return JsonResponse({'success': False, 'msg': 'invalid_details'})
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
                return JsonResponse({'success': False, 'msg': 'username_not_unique'})


def is_valid_sign_up(username: str):
    try:
        User.objects.get(user_name=username)
    except User.DoesNotExist:
        return True
    return False


def is_valid_sign_in(username: str, password: str):
    try:
        User.objects.get(user_name=username, password=password)
    except User.DoesNotExist:
        return False
    return True


@csrf_exempt
def chat(request):
    if request.method == 'POST':
        if not is_session_present(request):
            get_user_and_session(request, request.POST['username'])
        return HttpResponseRedirect('/chat')
    else:
        if is_session_present(request):
            return HttpResponse("Hello user: " + request.session['username'])
        else:
            return HttpResponseRedirect('/')


def get_user_and_session(request, username: str):
    try:
        User.objects.get(user_name=username)
        request.session['username'] = username
    except User.DoesNotExist:
        return HttpResponseRedirect('/')


def is_session_present(request):
    if 'username' in request.session:
        return True
    else:
        return False


@csrf_exempt
def logout(request):
    request.session.pop('username')
    return HttpResponseRedirect('/')
# TODO: add chat interface
