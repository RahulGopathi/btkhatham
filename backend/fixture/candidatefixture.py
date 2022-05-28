import factory
import factory.fuzzy
import random

PRIMARY_ROLE_CHOICES = ['full-stack-engineer', 'frontend-engineer', 'backend-engineer', 'devops-engineer', 'mobile-developer',
                        'data-engineer', 'data-scientist']

SKILLS = ["Javascript", "Node.js", "Nginx", "AWS", "EC2", "S3", "DynamoDB", "Docker",
          "React.js", "Vue.Js", "Python", "Django", "Flask", "Docker", "Docker Compose", "Kubernetes"]

STATUS_CHOICES = ["applied", "accepted", "rejected"]


class CandidateFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = 'main.Candidate'
        django_get_or_create = ('first_name', 'last_name', 'primary_role', 'education', 'experience', 'bio', 'email', 'phone', 'adress',
                                'city', 'state', 'zipcode', 'country', 'projects', 'skills', 'status', 'website', 'linkedln', 'github')

    first_name = factory.Faker('first_name')
    last_name = factory.Faker('last_name')
    primary_role = factory.Faker('random_element', elements=PRIMARY_ROLE_CHOICES)
    education = factory.Faker('sentence', nb_words=5)
    experience = factory.Faker('sentence', nb_words=50)
    bio = factory.Faker('sentence', nb_words=20)
    email = factory.Faker('email')
    phone = random.randint(6000000000, 9999999999)
    adress = factory.Faker('address')
    city = factory.Faker('city')
    state = factory.Faker('state')
    zipcode = factory.Faker('zipcode')
    country = factory.Faker('country')
    projects = factory.Faker('sentence', nb_words=50)
    website = "http://example.com/"
    linkedln = "http://example.com/" 
    github = "https://github.com/" 
    skills = random.choice(SKILLS) + ', ' + random.choice(SKILLS) + ', ' + random.choice(SKILLS)
    status = factory.Faker('random_element', elements=STATUS_CHOICES)
