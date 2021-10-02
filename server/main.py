import json
import subprocess
import tempfile

import numpy
from PIL import Image
from fastapi import FastAPI, File, Form
from fastapi.middleware.cors import CORSMiddleware
from jinja2 import Template
from matplotlib import pyplot as plt

from load_env import load_env_variables

ENVIRON = load_env_variables()

app = FastAPI()

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/light_curve")
async def light_curve(
        stl_file: bytes = File(...),
        light_pol: float = Form(...),
        light_azi: float = Form(...),
        rot_axis_pol: float = Form(...),
        rot_axis_azi: float = Form(...),
):
    resolution = int(ENVIRON["RENDER_RESOLUTION"])
    frames = int(ENVIRON["FRAMES"])

    with open(ENVIRON["SCRIPT_PATH"], mode="r") as file:
        script_template = Template(file.read())

    # create temp dir for cleaning up templated script
    with tempfile.TemporaryDirectory() as temp_dir_name:
        temp_stl_file_path = f"{temp_dir_name}/object.stl"
        with open(temp_stl_file_path, "wb") as temp_stl_file:
            temp_stl_file.write(stl_file)

        temp_script_path = f"{temp_dir_name}/temp_blender_script.py"

        blend_file_path = f"{temp_dir_name}/animation.blend"
        with open(temp_script_path, mode="w") as fp:
            rendered_script = script_template.render(
                stl_path=temp_stl_file_path,
                blend_path=blend_file_path,
                resolution=resolution,
                light_pol=light_pol,
                light_azi=light_azi,
                rot_axis_pol=rot_axis_pol,
                rot_axis_azi=rot_axis_azi
            )

            fp.write(rendered_script)

        subprocess.run([ENVIRON["BLENDER_PATH"], "-b", "-P", temp_script_path])
        subprocess.run([ENVIRON["BLENDER_PATH"], "-b", blend_file_path, "-o", "//frames/###.TIFF", "-t", "1", "-a"])

        all_images_array = numpy.zeros(shape=(frames, resolution, resolution))
        for frame in range(1, 361):
            file_name = f"{temp_dir_name}/frames/{str(frame).zfill(3)}.TIFF"
            image = Image.open(file_name)
            all_images_array[frame - 1] = numpy.asarray(image)

        raw_light_curve = numpy.sum(all_images_array, axis=(1, 2))

        normalised_light_curve = raw_light_curve / raw_light_curve.max()
        plt.plot(list(range(0, 360)), normalised_light_curve)

        lists = normalised_light_curve.tolist()
        json_str = json.dumps(lists)

        return json_str
