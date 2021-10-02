from math import pi

import bpy

# Parameters to be passed in
stl_file_path = "{{ stl_path }}"
light_x_angle = 1.74533
light_y_angle = 3.49066
light_z_angle = 0.5
camera_ortho_scale = 17.1012

# Useful shortcut
scene = bpy.context.scene

print(scene.objects.keys())

''' Removing initial objects'''
# Deselect all
bpy.ops.object.select_all(action='DESELECT')

# Select the cube and light
bpy.data.objects['Cube'].select_set(True)
bpy.data.objects['Light'].select_set(True)

# Delete the cube and light
bpy.ops.object.delete()

''' Set up sun light '''
# create light datablock, set attributes
light_data = bpy.data.lights.new(name="Sun", type='SUN')

# create new object with our light datablock
light_object = bpy.data.objects.new(name="Sun", object_data=light_data)

# link light object
bpy.context.collection.objects.link(light_object)

# make it active
bpy.context.view_layer.objects.active = light_object

dg = bpy.context.evaluated_depsgraph_get()
dg.update()

# Set light angles
bpy.data.objects['Sun'].select_set(True)
bpy.context.object.rotation_euler[0] = light_x_angle
bpy.context.object.rotation_euler[1] = light_y_angle
bpy.context.object.rotation_euler[2] = light_z_angle

''' Set up camera '''
bpy.data.cameras['Camera'].type = 'ORTHO'
bpy.data.cameras['Camera'].ortho_scale = camera_ortho_scale

''' Import STL file '''
# Import the STL file
bpy.ops.import_mesh.stl(filepath=stl_file_path)
asteroid = bpy.context.object

''' Simple animation '''
angles = [0, pi, 2 * pi]
# start with frame 0
number_of_frame = 0
bpy.context.scene.frame_end = 360

for angle in angles:
    # now we will describe frame with number $number_of_frame
    scene.frame_set(number_of_frame)

    asteroid.rotation_euler[0] = angle
    asteroid.keyframe_insert(data_path="rotation_euler", index=-1)

    # move next 10 frames forward - Blender will figure out what to do between this time
    number_of_frame += int(360 / 2)

bpy.context.scene.eevee.taa_render_samples = 1
bpy.context.scene.eevee.taa_samples = 1
bpy.context.scene.render.resolution_x = 200
bpy.context.scene.render.resolution_y = 200
bpy.context.scene.render.image_settings.color_mode = 'BW'
bpy.context.scene.render.image_settings.compression = 0
bpy.context.scene.render.image_settings.file_format = 'TIFF'
bpy.context.scene.sequencer_colorspace_settings.name = 'Raw'
bpy.context.scene.view_settings.gamma = 0
bpy.context.scene.display_settings.display_device = 'None'
bpy.context.scene.render.image_settings.tiff_codec = 'NONE'


bpy.ops.wm.save_as_mainfile(filepath="{{ blend_path }}")

