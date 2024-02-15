from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("images", "0005_alter_image_created_alter_profile_created"),
    ]

    operations = [
        migrations.RenameField(
            model_name="image",
            old_name="owner_id",
            new_name="owner",
        ),
    ]
