var capabilities = {
    label: '',
    practices: {
        "Software’s fitness for purpose": [
            {label:'The application(s) must work', level: 0},
            {label: 'They must be "Good Enough"', level: 0}
        ],
        "Release cadence": [
            {label: 'Continuous delivery is the ideal',level:0},
            {label:'At least daily?',level:0},
            {label:'At least weekly?',level:0},
            {label:'At least monthly?',level:0},
            {label:'Stakeholders and users have access to regular releases',level:0}
        ],
        "Governance": [
            {label: 'There are iterations', level: 0},
            {label: 'The process is measured, predictable and stable', level: 0},
            {label: 'Team only works on items within the current iteration',level: 0},
            {label: 'Team is self-organising',level: 0},
            {label: 'Continuous improvement is built into the process, including regular retrospectives',level: 0}
        ],
        "Working Environment": [
            {label: 'Team has appropriate isolation from external distractions', level: 0},
            {label: 'Team has appropriate access to users and stakeholders', level: 0},
            {label: 'Team takes responsibility for the product and production', level: 0},
            {label: 'The software producers and stakeholders function as a single team', level: 0}
        ],
        "Tooling": [
            {label: 'Developers have access to the best tools that money can buy', level: 0},
            {label: 'Developers have freedom to use the right tool for the job', level: 0}
        ],
        "Work items": [
            {label: 'There is a work item tracking tool', level: 0},
            {label: 'Work items are sufficiently detailed to allow independent completion', level: 0},
            {label: 'Acceptance criteria are defined prior to implementation', level: 0},
            {label: 'All features are checked via automated tests', level: 0},
            {label: 'Every commit produces a report of the status of all features', level: 0},
            {label: 'All work items are estimated', level: 0},
            {label: 'The list of work items (backlog) is kept prioritized', level: 0}
        ],
        "Reporting": [
            {label: 'Estimates are up to date', level: 0},
            {label: 'There are burn-down charts', level: 0},
            {label: 'Status dashboards are highly visible', level: 0},
            {label: 'Scheduling is based on empirical evidence', level: 0},
            {label: 'Scheduling is based on empirical evidence', level: 0}
        ],
        "Source code": [
            {label: 'Code is in version control', level: 0},
            {label: 'Code has commit comments', level: 0},
            {label: 'Code compiles straight out of version control', level: 0},
            {label: 'All tests pass', level: 0},
            {label: 'There are tests', level: 0},
            {label: 'Code is clean and self-documenting', level: 0},
            {label: 'Code is simple (as possible)', level: 0},
            {label: 'Code changes are linked to work items', level: 0},
            {label: 'Code demonstrates knowledge of software engineering principles', level: 0},
            {label: 'Code adheres to commonly-accepted design patterns', level: 0},
            {label: 'There are code reviews', level: 0},
            {label: 'The team has shared code ownership', level: 0},
            {label: 'Software quality metrics are tracked and used for improvement', level: 0}
        ],
        "Security": [
            {label: 'Applications are hardened against casual scans', level: 0},
            {label: 'Applications are hardened against targeted attacks', level: 0},
            {label: 'Application and infrastructure security is commensurate with identified risk', level: 0}
        ],
        "Builds": [
            {label: 'There are automated builds', level: 0},
            {label: 'All branches are built on every commit', level: 0}
        ],
        "Deployment": [
            {label: 'Deployment is automated', level: 0},
            {label: 'Infrastructure is code', level: 0},
            {label: 'All branches are deployed somewhere on every commit', level: 0},
            {label: 'Releases are routine and require no maintenance windows', level: 0}
        ],
        "Skills development": [
            {label: 'There is an active and regular review + feedback process', level: 0},
            {label: 'Developers are paid to learn', level: 0},
            {label: 'Developers are held accountable for learning', level: 0}
        ]
    },
    items: function () {
        return [].concat.apply([], Object.keys(this.practices).map(function (practice) {
            return this.practices[practice];
        },this));
    },
    total: function() {
        return this.items().reduce(function (prev,curr) {
            return prev + curr.level;
        }, 0);
    },
    percentage: function () {

        return Math.round(100 * this.total() / (this.items().length * 2));
    }
};

var Table = React.createClass({displayName: "Table",
    render: function () {
        var categories =  Object.keys(this.props.data.practices).map(function (category) {
            var capabilityRows = this.props.data.practices[category].map(function(capability) {
                var mapLevelsToStyles = {0:'danger',1: 'warning', 2:'success'};
                var cols = [0,1,2].map(function (i) {
                    return React.createElement("td", null, React.createElement("input", {type: "checkbox", name: "level", checked: capability.level == i, onChange: this.levelChange.bind(this,i,capability,capability.level != i)}));
                },this);
                return React.createElement("tr", {className: mapLevelsToStyles[capability.level]}, React.createElement("td", null, capability.label), cols)
            },this);
            return [].concat.apply([], [[React.createElement("tr", null, React.createElement("th", {colSpan: "4"}, category))], capabilityRows]);
        },this);
        return React.createElement("table", {className: "table table-hover"}, React.createElement("tr", null, React.createElement("th", null), React.createElement("th", null, "Poor"), React.createElement("th", null, "OK"), React.createElement("th", null, "Great")), categories);
    },
    levelChange: function (newLevel,capability,turningOn) {
        if (turningOn) capability.level = newLevel;
        this.setProps(this.props);
        this.props.onInput();
    }
});




google.setOnLoadCallback(drawChart);
      function drawChart() {

        var data = google.visualization.arrayToDataTable([
          ['Label', 'Value'],
          [capabilities.label, capabilities.percentage()]
        ]);

        var options = {
          width: 600, height: 180,
          redFrom:0, redTo: 55,
          greenFrom: 90, greenTo: 100,
          minorTicks: 5
        };

        var chart = new google.visualization.Gauge(document.getElementById('chart_div'));

        chart.draw(data, options);

        function input() {
            console.dir(capabilities.total());
            console.dir(capabilities.percentage());
            var data = google.visualization.arrayToDataTable([
              ['Label', 'Value'],
              [capabilities.label, capabilities.percentage()]
            ]);
            chart.draw(data,options);
        }

React.render(React.createElement(Table, {data: capabilities, onInput: input}), document.getElementById('app'));

      }
