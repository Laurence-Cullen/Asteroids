import bpy

# Useful shortcut
scene = bpy.context.scene

# Deselect all
bpy.ops.object.select_all(action='DESELECT')

# Select the cube
bpy.data.objects['Cube'].select_set(True) 

# Delete the cube
bpy.ops.object.delete() 

# Import the STL file
bpy.ops.import_mesh.stl(filepath="/home/michael/repos/Asteroids/blender_scripts/216kleopatra.stl")

# Select the light
lamp_data = bpy.data.lamps.new(name="lampa", type='POINT')  
lamp_object = bpy.data.objects.new(name="Lampicka", object_data=lamp_data)  
scene.objects.link(lamp_object)  
lamp_object.location = (-3, 0, 12)


