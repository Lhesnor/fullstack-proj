from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("images", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="image",
            name="image_id",
        ),
    ]
