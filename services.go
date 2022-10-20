package main

import (
	"fmt"
	"os"
	"path"
)

/*
* Setting storage service functions
*
 */
func (a *App) StoreSettings(input string) {

	appDirectory := "camUI"
	fileName := "input.txt"

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
		return
	}

	// write the input to the file
	l, err := f.WriteString(input)

	if err != nil {
		fmt.Println(err)
		f.Close()
		return
	}

	fmt.Println(l, "bytes written successfully")

	err = f.Close()

	if err != nil {
		fmt.Println(err)
		return
	}
}

func (a *App) GetSettings() string {

	appDirectory := "camUI"
	fileName := "input.txt"
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
