from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('candidates/', views.CandidatesView.as_view(), name='candidate'),
    path('candidates/register/', views.CandidateRegisterView.as_view(), name='candidate_register'),
    path('candidates/<int:pk>/', views.CandidateUpdateView.as_view(), name='individual_candidate'),
    path('candidates/<int:pk>/delete/', views.CandidateDeleteView.as_view(), name='candidate_delete'),
    path('', views.getRoutes)
]
