class CustomUser:
    def __init__(self, username, email, full_name=None, password=None):
        self.username = username
        self.email = email
        self.full_name = full_name
        self.password = password

    def to_dict(self):
        return {
            "username": self.username,
            "email": self.email,
            "full_name": self.full_name,
            "password": self.password,
        }

    @staticmethod
    def from_dict(data):
        return CustomUser(
            username=data["username"],
            email=data["email"],
            full_name=data.get("full_name"),
            password=data["password"],
        )
