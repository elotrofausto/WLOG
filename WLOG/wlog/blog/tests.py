from django.test import TestCase
from django.contrib.auth.models import User

from django.test import TestCase
from .models import Post, Page, Product

class ObjectOperationsTestCase(TestCase):

    def setUp(self):
        #Creates a dummy user for running the tests
        self.user = User.objects.create_user(username='testuser', password='12345')
        login = self.client.login(username='testuser', password='12345')
        
        #Create Objects
        Post.objects.create(title="This is a test Post", slug="test-post", text="Hello world", author_id=1)
        Page.objects.create(title="The author", slug="the-author", text="Hello, I'm the author of...")
        Product.objects.create(title="My book", slug="my-book", sku=1234567890123, author_id=1)

    def test_post_has_been_created(self):
        """Chech if the object has been properly created"""
        post = Post.objects.get(slug="test-post")
        product = Product.objects.get(slug="my-book")
        page = Page.objects.get(slug="the-author")

        #Tests
        self.assertEqual(post.__str__(), 'This is a test Post')
        self.assertEqual(page.__str__(), 'The author')
        self.assertEqual(product.__str__(), 'My book')
        