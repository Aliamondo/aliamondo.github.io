import os
import sys
import signal

def rec_del(d):
    dirs = []
    try:
        dirs = os.listdir(d)
        #print(dirs)
    except NotADirectoryError as N:
        return
        #print(N)
    if (dirs == []):
        #print("empty")
        print("DELETED: " + d)
        os.removedirs(d)
        return
    if (len(dirs) >= 0):
        all_jpg = True
        for i in dirs:
            x = i.split(".")
            if x[-1] == "jpg" or x[-1] == "ini":
                pass
                #print ("JPG FILE")
            else:
                all_jpg = False
        if (all_jpg):
            #print("ALL JPG FILES")
            for i in dirs:
                #print(d + "\\" + i)
                os.remove(d + "\\" + i)
            os.removedirs(d)
            print("DELETED: " + d)
            return
    for i in dirs:
        rec_del(d + "\\" + i)
    return "----------------------------------"

username = os.getlogin()
path = "C:\\Users\\" + username + "\\Music\\iTunes\\iTunes Media\\Music"
musicdirs = (os.listdir(path))
for i in musicdirs:
    rec_del(path + "\\" + i)
print("----------------------------------")
print("PRESS ENTER")
input()
