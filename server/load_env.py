import os


def load_env_variables():
    environ = os.environ

    names = []
    for env_var in ENV_VARIABLES:
        name, required, default = env_var
        names.append(name)
        environ = load_variable(name, required, default, environ)

    all_vars = list(environ.keys())

    unwanted_vars = set(all_vars) - set(names)

    for unwanted_var in unwanted_vars:
        del environ[unwanted_var]

    return os.environ


def load_variable(name, required, default, environ: dict):
    if not (required and name in environ):
        raise EnvironmentError(f"Environment variable {name} is required but not present")

    # if not required use env if present otherwise fall back to default
    if not required:
        environ[name] = environ.get(name, default)

    return environ


ENV_VARIABLES = [
    # (name, required, default)
    ("BLENDER_PATH", True, None),  # path to the Blender executable
    ("SCRIPT_PATH", True, None),  # path to script to run inside blender to create .blend file
]

if __name__ == '__main__':
    environ = load_env_variables()
    print(environ)
