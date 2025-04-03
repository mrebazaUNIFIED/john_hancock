from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Document,Author,Period,Post,Recipient,Search,Location,Institution,Type,Sublocation

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","username","password"]
        extra_kwargs = {"password":{"write_only":True}}

    def create(self,validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class PeriodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Period
        fields = "__all__"
        
class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = "__all__"

class RecipientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipient
        fields = ['id','name','last_name']

class InstitutionSerializer(serializers.ModelSerializer):
    class Meta:
        model= Institution
        fields = '__all__'

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model= Location
        fields = '__all__'

class SubLocationSerializer(serializers.ModelSerializer):
    location = LocationSerializer()
    class Meta:
        model= Sublocation
        fields = '__all__'

class TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model= Type
        fields = '__all__'
        
class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model= Document
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    recipient = RecipientSerializer(read_only=True)
    document = DocumentSerializer(read_only=True)
    type = TypeSerializer(read_only=True)
    institution = InstitutionSerializer(read_only=True)
    sublocation = SubLocationSerializer(read_only=True)
    period = PeriodSerializer(read_only=True)

    # Permitir enviar solo los IDs en POST/PUT
    author_id = serializers.PrimaryKeyRelatedField(
        queryset=Author.objects.all(), source="author", write_only=True
    )
    recipient_id = serializers.PrimaryKeyRelatedField(
        queryset=Recipient.objects.all(), source="recipient", write_only=True
    )
    document_id = serializers.PrimaryKeyRelatedField(
        queryset=Document.objects.all(), source="document", write_only=True
    )
    type_id = serializers.PrimaryKeyRelatedField(
        queryset=Type.objects.all(), source="type", write_only=True
    )
    institution_id = serializers.PrimaryKeyRelatedField(
        queryset=Institution.objects.all(), source="institution", write_only=True
    )
    sublocation_id = serializers.PrimaryKeyRelatedField(
        queryset=Sublocation.objects.all(), source="sublocation", write_only=True
    )
    period_id = serializers.PrimaryKeyRelatedField(
        queryset=Period.objects.all(), source="period", write_only=True
    )

    class Meta:
        model = Post
        fields = [
            "id",
            "author", "author_id",
            "recipient", "recipient_id",
            "document", "document_id",
            "type", "type_id",
            "institution", "institution_id",
            "sublocation", "sublocation_id",
            "period","period_id",
            "title", "slug", "content",
            "date", "status", "citeAs", "image",
        ]

