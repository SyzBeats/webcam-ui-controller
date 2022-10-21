package main

import (
	"fmt"
	"os"
	"path"
)

// globals for file paths
var appDirectory string = "camUI"
var fileName string = "input.json"

type Settings struct {
	Presets       string
	Manipulations string
	Parameters    string
	Camera        string
}

// Stores settings in a file within the users config directory
func (a *App) StoreSettings(input string) {

	// get users config directory
	configDirectory, err := os.UserConfigDir()

	if err != nil {
		fmt.Println("Error getting user config directory")
		return
	}

	// join config directory with app directory
	appDirectoryPath := path.Join(configDirectory, appDirectory)

	// create app directory if it doesn't exist
	_, err = os.Stat(appDirectoryPath)

	if os.IsNotExist(err) {
		os.Mkdir(appDirectoryPath, 0755)
	}

	// create the config file, join paths
	appConfigPath := path.Join(appDirectoryPath, fileName)

	f, err := os.Create(appConfigPath)

	if err != nil {
		fmt.Println(err)
		f.Close()
		return
	}

	// write the input to the file
	_, err = f.Write([]byte(input))

	if err != nil {
		fmt.Println(err)
		f.Close()
		return
	}

	err = f.Close()

	if err != nil {
		fmt.Println(err)
		return
	}
}

// get the settings from the users config directory
func (a *App) GetSettings() string {

	configDirectory, err := os.UserConfigDir()

	if err != nil {
		fmt.Println("Error getting user config directory")
		return "config not found"
	}

	// join config directory with app directory
	appConfigPath := path.Join(configDirectory, appDirectory, fileName)

	// Next read the file and return as string
	configFile, err := os.ReadFile(appConfigPath)

	if err != nil {
		fmt.Println(err)
		return ""
	}

	return string(configFile)
}
