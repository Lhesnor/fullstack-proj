from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Image",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("image_id", models.UUIDField()),
                ("owner_id", models.UUIDField()),
                ("url", models.CharField(max_length=100)),
                ("text", models.TextField()),
                ("created", models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
