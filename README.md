# README

## About

This is a webcam UI controller for currently two lines of cameras:

- _Fomako PTZ Video Camera_
- _SMTAV_

The interface enables the user to control the camera's pan, tilt and zoom functions. The user can also set the camera's preset positions and move the camera to these positions.
The apps backend is based on Golang and uses the [Wails](https://wails.app/) framework.

The frontend is based on [React](https://reactjs.org/) and uses [zustand](https://github.com/pmndrs/zustand) as state management.

## Development

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Golang](https://golang.org/)
- [Wails](https://wails.app/)

## Using the .exe

To build the app on your machine, run the following command:

```bash
wails build
```

This will generate a .exe file in the `build` folder under the `bin` directory.

Simply run the .exe file and the app will start. The app will try to connect to the camera on the default port 80. If the camera is not on this port, you can change the port in the settings.
