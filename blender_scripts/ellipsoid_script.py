#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Oct  3 11:54:04 2021

@author: michael
"""

import bpy
import bmesh
import math

''' Parameters to be passed in '''
semi_axis_x = 0.5
semi_axis_y = 1
semi_axis_z = 0.25
light_pol = 0.5 * math.pi
light_azi = 0.5 * math.pi
axis_pol = 0.32 * math.pi
axis_azi = 0.79 * math.pi 


# Useful shortcut
scene = bpy.context.scene

# Settings
camera_ortho_scale = 1.2
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
light_x = math.cos(light_azi) * math.sin(light_pol)
light_y = math.sin(light_azi) * math.sin(light_pol)
light_z = 0

bpy.data.objects['Sun'].select_set(True)
bpy.context.object.rotation_mode = 'AXIS_ANGLE'
bpy.context.object.rotation_axis_angle[0] = light_pol
bpy.context.object.rotation_axis_angle[1] = light_x
bpy.context.object.rotation_axis_angle[2] = light_y
bpy.context.object.rotation_axis_angle[3] = light_z

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


''' Create the ellipsoid '''
# Create the empty mesh and object
mesh = bpy.data.meshes.new('Asteroid')
asteroid = bpy.data.objects.new("Asteroid", mesh)

# Add the object into the scene.
bpy.context.collection.objects.link(asteroid)

# Select the newly created object
bpy.context.view_layer.objects.active = asteroid
asteroid.select_set(True)

# Construct the bmesh sphere and assign it to the blender mesh
bm = bmesh.new()
bmesh.ops.create_icosphere(bm, subdivisions=4, diameter=1)
bm.to_mesh(mesh)
bm.free()

# Transform in x, y, z


# Add smooth shader
bpy.ops.object.shade_smooth()



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

# Determine angles
asteroid.rotation_mode = 'AXIS_ANGLE'
axis_x = math.cos(axis_azi) * math.sin(axis_pol)
axis_y = math.sin(axis_azi) * math.sin(axis_pol)
axis_z = math.cos(axis_pol)


for angle in angles:

    # now we will describe frame with number $number_of_frame
    scene.frame_set(number_of_frame)

    asteroid.rotation_axis_angle[0] = angle
    asteroid.rotation_axis_angle[1] = axis_x
    asteroid.rotation_axis_angle[2] = axis_y
    asteroid.rotation_axis_angle[3] = axis_z

    asteroid.keyframe_insert(data_path="rotation_axis_angle", index=-1)

    # move next 10 frames forward - Blender will figure out what to do between this time
    number_of_frame += int(360/2)
    
    
fcurves = asteroid.animation_data.action.fcurves
for fcurve in fcurves:
    for kf in fcurve.keyframe_points:
        kf.interpolation = 'LINEAR'










