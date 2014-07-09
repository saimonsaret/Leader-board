#!/usr/bin/python

import commands
import time
import datetime

def dataUpload(prefix, path, stream):
	response = commands.getstatusoutput('ls ' + prefix + path)
	files = response[1].split("\n")

	for i in range(0, len(files)):

		filePath = path + "/" + files[i]
		response = commands.getstatusoutput('cd ' + prefix + filePath)

		if (response[1] == ''):
			dataUpload(prefix, filePath, stream)

		parts = files[i].split('.')

		if (parts[len(parts) - 1] == "html"):

			gitResponse = commands.getstatusoutput('git log --follow --pretty=format:"%an" ' + prefix + filePath)
			stream.write(filePath + "\n")
			log = gitResponse[1].split("\n")
			for j in range(0, len(log)):
				stream.write(log[j] + "\n")
			stream.write("###" + "\n")
			print("Added " + filePath)
			

config = open("responsibility_updater.config", "r")
dest = config.read().split("\n")[0]

while (1):
	now = datetime.datetime.now()
	toWait = 60 - now.second + (60 - now.minute - 1) * 60 + (24 - now.hour - 1) * 60 * 60
	print("Result destination: " + dest)
	print ("Current time: " + str(now))
	print("Waiting " + str(toWait) + " seconds until 00:00:00...")
	
	time.sleep(toWait)
	print("Starting update...")

	outputStream = open("results", "w")
	dataUpload("LayoutTests/", "inspector", outputStream)
	dataUpload("LayoutTests/", "inspector-enabled", outputStream)
	dataUpload("LayoutTests/", "inspector-protocol", outputStream)
	dataUpload("LayoutTests/", "http/tests/inspector", outputStream)
	dataUpload("LayoutTests/", "http/tests/inspector-enabled", outputStream)
	dataUpload("LayoutTests/", "http/tests/inspector-protocol", outputStream)
	print("Update ended!")

	dirExists = (commands.getstatusoutput("cd backups")[1] == "")
	if (not dirExists):
		commands.getstatusoutput("mkdir backups")
	commands.getstatusoutput("cp " + dest + " backups/" + str(now.day) + "." + str(now.month) + "." + str(now.year) + ".backup")
	commands.getstatusoutput("cp results " + dest)
