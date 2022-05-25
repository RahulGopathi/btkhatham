from rest_framework.decorators import api_view
from rest_framework.response import Response
from api.serializer import MyTokenObtainPairSerializer, RegisterSerializer, CandidateSerializer, IndividualCandidateSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated
from main.models import Candidate


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/login/',
        '/api/register/',
        '/api/login/refresh/'
        '/api/candidates/',
        '/api/candidates/register',
        '/api/candidates/id',
        '/api/candidates/id/delete',
    ]
    return Response(routes)


class CandidatesView(generics.ListAPIView):
    queryset = Candidate.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = CandidateSerializer


class CandidateRegisterView(generics.CreateAPIView):
    queryset = Candidate.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = IndividualCandidateSerializer


class CandidateUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Candidate.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = IndividualCandidateSerializer


class CandidateDeleteView(generics.DestroyAPIView):
    queryset = Candidate.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = IndividualCandidateSerializer
