package main

import (
	"context"
	"fmt"
	"os"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

// get the input and store in a file
func (a *App) StoreInput(input string) {

	// create a new directory called "userspace/store"

	os.MkdirAll("userspace/store", 0755)

	// create a new file called "userspace/store/input.txt"
	f, err := os.Create("userspace/store/input.txt")

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
