from django.db import models

# Create your models here.
class Author(models.Model):
    name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)

    def __str__(self):
        return f"Autor {self.name}"

class Recipient(models.Model):
    name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    def __str__(self):
        return f"Recipient {self.name}"

class Period(models.Model):
    name = models.CharField(max_length=50)
    year_start = models.DateField()
    year_end = models.DateField()
    image = models.ImageField(upload_to="periods/")


    def __str__(self):
        return f"Period {self.name}"
    
    
class Document(models.Model):
    name = models.CharField(max_length=100)
    path =  models.FileField(upload_to="document/")
    status = models.BooleanField()
    uploadDate = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Document {self.name}"

class Type(models.Model):
    type=models.CharField(max_length=50)

class Institution(models.Model):
    name = models.CharField(max_length=100)

class Subinstitution(models.Model):
    name = models.CharField(max_length=100)
    institution = models.ForeignKey(Institution,on_delete=models.CASCADE, related_name='sub_institution')

class Location(models.Model):
    name = models.CharField(max_length=100)

class Sublocation(models.Model):
    name = models.CharField(max_length=100)
    location = models.ForeignKey(Location,on_delete=models.CASCADE, related_name='sub_location')
        

class Post(models.Model):
    author = models.ForeignKey(Author,on_delete=models.CASCADE, related_name='post_author')
    recipient = models.ForeignKey(Recipient,on_delete=models.CASCADE, related_name='post_recipient')
    document = models.ForeignKey(Document,on_delete=models.CASCADE, related_name='post_document')
    type = models.ForeignKey(Type,on_delete=models.CASCADE, related_name='post_type')
    institution = models.ForeignKey(Institution,on_delete=models.CASCADE, related_name='post_institution')
    sublocation = models.ForeignKey(Sublocation,on_delete=models.CASCADE, related_name='post_sublocation')
    period = models.ForeignKey(Period,on_delete=models.CASCADE, related_name='post_period')
    title = models.CharField(max_length=150)
    slug  = models.CharField(max_length=150)
    content = models.TextField()
    date =  models.DateField()
    status = models.BooleanField()
    citeAs = models.TextField()
    image = models.ImageField(upload_to="post/")

    def __str__(self):
        return f"Post {self.title}"


class Search(models.Model):
    postSearch = models.ForeignKey(Post,on_delete=models.CASCADE, related_name='search_post')
    quantity = models.IntegerField()

    def __str__(self):
        return f"Search {self.postSearch.title} - {self.quantity}"


