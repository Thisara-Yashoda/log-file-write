
# log-file-write

Loggers are used by applications and runtime components to capture message and trace events. Log handlers write log record objects to output devices like log files

## this plug use only work for node backend!!!!!


## Features 

- [x] (new)Slack webhook support
- [x] change timezone
- [x] customize logfile name
- [x] control console log
- [x] pretty loggers


## Installation
Install via NPM:

```
npm install log-file-write
```


```javascript

const {SetUserOptions,Info,Debug,Trace,Warn,Error,Fatal,Log} = require('log-file-write')

SetUserOptions({
    timeZone: 'Asia/Colombo',
    folderPath: './logs',      
    dateBasedFileNaming: true,
    fileName: 'Global_Logs',
    fileNamePrefix: 'Logs_',
    fileNameSuffix: 'file',
    fileNameExtension: '.log',         
    dateFormat: 'YYYY-M-DD',
    timeFormat: 'HH:mm:ss.SSS',
    logLevel: 'deb',
    onlyFileLogging: false, // if you want to print content to console
    slackWebhookUrl : '',  //https://hooks.slack.com/services/T04K
});

// // Log a simple error message
 Info('Some informational log message');

// // // Log an error message with service and method names
// Error('Something has failed!', 'Some service', 'Some method');


Debug('Debug message 1', 'Debug service', 'Debug method');
Trace('Trace message 1', 'Trace service', 'Trace method');
Info('Info message 1', 'Info service', 'Info method');
Warn('Warning message 1', 'Warn service', 'warn method');
Error('Error message 1', 'Error service', 'Error method');
Fatal('Fatal message 1', 'Fatal service', 'Fatal method');
Log('debug', 'Debug message 2', 'S1', 'M1', { baz: 'foo' }, 
    () => { console.log('Debug message 2'); })

// Log an fatal error message with service and method names and error object
Fatal('Something has failed!', 'Some service', 'Some method', {
    bar: 'foo'
});

Info('Something has failed!', null, null, null, function() {
    // Do something
    console.log('Messages have been logged');
});


```

## All Time Zone
### 📎
[Time zone](https://gist.github.com/diogocapela/12c6617fc87607d11fd62d2a4f42b02a)

