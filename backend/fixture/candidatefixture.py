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
        django_get_or_create = ('first_name', 'last_name', 'primary_role', 'experience', 'bio', 'email', 'phone', 'adress',
                                'city', 'state', 'zipcode', 'country', 'projects', 'skills', 'status')

    first_name = factory.Faker('first_name')
    last_name = factory.Faker('last_name')
    primary_role = factory.fuzzy.FuzzyChoice(PRIMARY_ROLE_CHOICES)
    experience = random.randint(0, 10)
    bio = factory.Faker('sentence', nb_words=100)
    email = factory.Faker('email')
    phone = random.randint(6000000000, 9999999999)
    adress = factory.Faker('address')
    city = factory.Faker('city')
    state = factory.Faker('state')
    zipcode = factory.Faker('zipcode')
    country = factory.Faker('country')
    projects = factory.Faker('sentence', nb_words=50)
    skills = str(factory.fuzzy.FuzzyChoice(SKILLS)) + ', ' + str(factory.fuzzy.FuzzyChoice(SKILLS)) + ', ' + str(factory.fuzzy.FuzzyChoice(SKILLS))
    status = factory.fuzzy.FuzzyChoice(STATUS_CHOICES)
