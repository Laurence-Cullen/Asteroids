import bpy
import math

# Parameters to be passed in
# stl_file_path = "/home/michael/repos/Asteroids/blender_scripts/216kleopatra.stl"
stl_file_path = "/home/michael/repos/Asteroids/blender_scripts/gato_3.stl"
light_x_angle = 1.74533
light_y_angle = 3.49066
light_z_angle = 0.5
camera_ortho_scale = 1

# Useful shortcut
scene = bpy.context.scene

# Settings
bpy.context.scene.render.resolution_x = 1080
bpy.data.worlds["World"].node_tree.nodes["Background"].inputs[0].default_value = (0, 0, 0, 1)


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
bpy.data.objects['Sun'].select_set(False)

''' Set up camera '''
bpy.data.cameras['Camera'].type = 'ORTHO'
bpy.data.cameras['Camera'].ortho_scale = camera_ortho_scale

# Moves to along the y axis
scene.camera.location.x = 0
scene.camera.location.y = -2
scene.camera.location.z = 0

# Rotates
scene.camera.rotation_euler[0] = math.pi / 2;
scene.camera.rotation_euler[1] = 0
scene.camera.rotation_euler[2] = 0


''' Import STL file '''
# Import the STL file
bpy.ops.import_mesh.stl(filepath=stl_file_path)

asteroid = bpy.context.object

# Move centre of mass to (0, 0, 0)
bpy.ops.object.origin_set(type='ORIGIN_CENTER_OF_VOLUME')
bpy.context.object.location[0] = 0
bpy.context.object.location[1] = 0
bpy.context.object.location[2] = 0

# Find size of asteroid 
encapsulating_radius = math.sqrt(asteroid.dimensions.x**2 + asteroid.dimensions.y**2 + asteroid.dimensions.z**2)

# Scale down size of asteroid
asteroid.scale[0] = 1 / encapsulating_radius
asteroid.scale[1] = 1 / encapsulating_radius
asteroid.scale[2] = 1 / encapsulating_radius



''' Simple animation '''
angles = [0, math.pi, 2 * math.pi]
# start with frame 0
number_of_frame = 0  
bpy.context.scene.frame_end = 360


for angle in angles:

    # now we will describe frame with number $number_of_frame
    scene.frame_set(number_of_frame)

    asteroid.rotation_euler[0] = angle
    asteroid.rotation_euler[1] = angle
    asteroid.keyframe_insert(data_path="rotation_euler", index=-1)

    # move next 10 frames forward - Blender will figure out what to do between this time
    number_of_frame += int(360/2)
    
    
fcurves = asteroid.animation_data.action.fcurves
for fcurve in fcurves:
    for kf in fcurve.keyframe_points:
        kf.interpolation = 'LINEAR'






