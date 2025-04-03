from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import UserSerializer,PeriodSerializer,AuthorSerializer,RecipientSerializer,InstitutionSerializer,LocationSerializer,PostSerializer,TypeSerializer,SubLocationSerializer,DocumentSerializer
from .models import Period,Document,Author,Post,Recipient,Search,Type,Institution,Location,Sublocation
from django.shortcuts import get_object_or_404

# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        user = serializer.save()

#Period
class PeriodListView(generics.ListAPIView):
    queryset= Period.objects.all()
    serializer_class = PeriodSerializer


class PeriodCreateView(generics.CreateAPIView):
    queryset= Period.objects.all()
    serializer_class = PeriodSerializer
    


class PeriodRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset= Period.objects.all()
    serializer_class = PeriodSerializer
    
#Author
class AuthorListView(generics.ListAPIView):
    queryset= Author.objects.all()
    serializer_class = AuthorSerializer

class AuthorCreateView(generics.CreateAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
    

class AuthorRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
    

#Recipient
class RecipientListView(generics.ListAPIView):
    queryset= Recipient.objects.all()
    serializer_class = RecipientSerializer

class RecipientCreateView(generics.CreateAPIView):
    queryset = Recipient.objects.all()
    serializer_class = RecipientSerializer
  

class RecipientRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Recipient.objects.all()
    serializer_class = RecipientSerializer
   


#Institution
class InstitutionListView(generics.ListAPIView):
    queryset = Institution.objects.all()
    serializer_class = InstitutionSerializer

class InstitutionCreateView(generics.CreateAPIView):
    queryset = Institution.objects.all()
    serializer_class = InstitutionSerializer
    permission_classes = [IsAuthenticated]

class InstitutionRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Institution.objects.all()
    serializer_class = InstitutionSerializer
    permission_classes = [IsAuthenticated]


#Location
class LocationListView(generics.ListAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

class LocationCreateView(generics.CreateAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    permission_classes = [IsAuthenticated]

class LocationRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    permission_classes = [IsAuthenticated]

#SubLocation 

class SubLocationListView(generics.ListAPIView):
    queryset = Sublocation.objects.select_related('location').all()
    serializer_class = SubLocationSerializer

class SubLocationCreateView(generics.CreateAPIView):
    queryset = Sublocation.objects.all()
    serializer_class = SubLocationSerializer
    permission_classes = [IsAuthenticated]

class SubLocationRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Sublocation.objects.all()
    serializer_class = SubLocationSerializer
    permission_classes = [IsAuthenticated]

#Type
class TypeListView(generics.ListAPIView):
    queryset = Type.objects.all()
    serializer_class = TypeSerializer

class TypeCreateView(generics.CreateAPIView):
    queryset = Type.objects.all()
    serializer_class = TypeSerializer
    permission_classes = [IsAuthenticated]

class TypeRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Type.objects.all()
    serializer_class = TypeSerializer
    permission_classes = [IsAuthenticated]


#Post
class PostListView(generics.ListAPIView):
    queryset = Post.objects.select_related(
        "author", "recipient", "document", "type", "institution", "sublocation"
    ).all()
    serializer_class = PostSerializer

class PostCreateView(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

class PostRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.select_related(
        "author", "recipient", "document", "type", "institution", "sublocation","period"
    ).all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = "slug"

#Document
class DocumentCreateView(generics.CreateAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    permission_classes = [IsAuthenticated]


class DocumentRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    permission_classes = [IsAuthenticated]