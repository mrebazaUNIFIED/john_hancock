from django.urls import path
from . import views


urlpatterns = [
    #Author
    path('author/',views.AuthorListView.as_view(),name='list-author'),
    path('author-create/',views.AuthorCreateView.as_view(),name='create-author'),
    path('author-rud/<int:pk>/',views.AuthorRetrieveUpdateDestroy.as_view(),name='rud-author'),
        
    #Recipient
    path('recipient/',views.RecipientListView.as_view(),name='list-recipient'),
    path('recipient-create/',views.RecipientCreateView.as_view(),name='create-recipient'),
    path('recipient-rud/<int:pk>/',views.RecipientRetrieveUpdateDestroy.as_view(),name='rud-recipient'),

    #Period
    path('period/',views.PeriodListView.as_view(),name='list-period'),
    path('period/create/',views.PeriodCreateView.as_view(),name='create-period'),
    path('period-rud/<int:pk>/',views.PeriodRetrieveUpdateDestroyView.as_view(),name='detail-update-destroy-period'),

    #Institution
    path('institution/',views.InstitutionListView.as_view(),name='list-institution'),
    path('institution/create/',views.InstitutionCreateView.as_view(),name='create-Institution'),
    path('institution-rud/<int:pk>/',views.InstitutionRetrieveUpdateDestroy.as_view(),name='detail-update-destroy-Institution'),
    
    #sublocation
    path('sublocation/',views.SubLocationListView.as_view(),name='list-sublocation'),
    path('sublocation/create/',views.SubLocationCreateView.as_view(),name='create-SubLocation'),
    path('sublocation-rud/<int:pk>/',views.SubLocationRetrieveUpdateDestroy.as_view(),name='detail-update-destroy-SubLocation'),

    #location
    path('location/',views.LocationListView.as_view(),name='list-location'),
    path('location/create/',views.LocationCreateView.as_view(),name='create-Location'),
    path('location-rud/<int:pk>/',views.LocationRetrieveUpdateDestroy.as_view(),name='detail-update-destroy-Location'),

    #type
    path('type/',views.TypeListView.as_view(),name='list-type'),
    path('type/create/',views.TypeCreateView.as_view(),name='create-Type'),
    path('type/<int:pk>/',views.TypeRetrieveUpdateDestroy.as_view(),name='detail-update-destroy-Type'),

    #post
    path('post/',views.PostListView.as_view(),name='list-post'),
    path('post/create/',views.PostCreateView.as_view(),name='create-Post'),
    path('post-rud/<slug:slug>/',views.PostRetrieveUpdateDestroy.as_view(),name='detail-update-destroy-Post'),

    #Document
    path('document/create/',views.DocumentCreateView.as_view(),name='create-Document'),
    path('document-rud/<int:pk>/',views.DocumentCreateView.as_view(),name='create-Document'),
]