# Cetti
[![Stories in Ready](https://badge.waffle.io/drager/cetti.png?label=ready&title=Ready)][waffle]
[![Build Status](https://travis-ci.org/drager/cetti.svg)][travis]

Dashboard for monitoring data reported from applications. For example errors, logs,
performance measures etc through widgets.

## Dashboard
A dashboard simply contains a list of widgets. Each dashboard has it's own configuration,
such as which widgets it should use, number of grids and rows and a name for the dashboard.

Each added dashboard will get it's own route via the object property key, for instance if
`errors` is the property key then it will be a route called `errors`.
The configured name will also be displayed in the navigation.

Each widget in the list of widgets has a placement, type, a name for the widget and which
bucket it should get its data from. It also has an type configuration where the widget can
have it's own configuration such as subtype for the widget if there are any subtypes.

## Widgets
There are three different types of widgets present: ListWidget, NumberWidget and ChartWidget.

The widgets data is called "buckets" and is simply a list of data points and data points simply
contains a id, timestamp, sessionId, and a value. So in the configuration for the dashboard
it needs a bucket where the widget should look for its data.

### ListWidget
The ListWidget contains two types of lists, a simple generic list and a error list. The generic
list just displays a title and a subtitle which can either be a string or a function.
The error list needs to display some more data such as occurrences and be able to resolve
errors and therefore cannot be as simple as the generic list.

### NumberWidget
The NumberWidget is simply for displaying numbers. It has three types of numbers, count, last and
sum. Count is used for counting the number of data points. Last uses the value of the last data
point and sum sums the values of all the data points.

### ChartWidget
The ChartWidget contains two types of charts, bar and line. The charts has its own configuration such as
which data should be used for the x and the y axis. For example so could we use the AxisType 'value'
which will simply use the data points value.

A simple dashboard configuration with one widget could look like this:
```
mydashboard: {
  name: 'My Dashboard',
  grid: {
    cols: 1,
    rows: 1,
  },
  widgets: [
    {
      placement: {
        x: 0,
        y: 0,
        width: 1,
        height: 1,
      },
      type: WidgetType.list,
      title: 'Successful builds',
      bucket: 'build',
      typeConfiguration: {
        type: ListType.generic,
        filter: (data) => data.value.result === 0,
        title: 'message',
        subtitle: (data) => {
          return `Build succeeded at ${new Date(Date.parse(data.value.finished_at))
                      .toLocaleString('sv-SE')}
                  at branch ${data.value.branch}`;
        },
      },
    },
  ],
},
```
## Contribute

If you're interested in helping with evolving this project, please do, check out [waffle][waffle] for issues
that can be done.

If there's something you want to fix, just start working and then send a pull request. *Remember*: The pull request can only
be merged if it passes the [travis build][travis].

Any feedback you have about using this project would also be greatly appreciated.

### Building

#### Prerequisites

You'll need to have node v4.0.0+ installed and npm v2.0.0+.
You need to be familiar with git.

#### Build

Once you have cloned the repository, building the project is very easy.

```
npm install
npm run build
```

## Running

```
npm install
npm run start
```

That's it, just go to: http://localhost:3000/ to see the project in action.

## Features and bugs
Please file feature requests and bugs at the [issue tracker][tracker].
See [waffle][waffle] for current work status.

[tracker]: https://github.com/drager/cetti/issues
[waffle]: https://waffle.io/drager/cetti
[travis]: https://travis-ci.org/drager/cetti
