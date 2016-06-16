var ActivityLogService = (function () {
    function ActivityLogService() {
    }
    ActivityLogService.prototype.applicationStarted = function () {
        var appActivityModel = require('dbModelsInitiator').getDbModel('appActivityLog');
        var activity = new appActivityModel({ date: '01/01/01', activity: 'Application Started' });
        activity.save(function (err, model) {
            if (err) {
                return console.error(err);
            }
            console.log('New data entered to DB:' + activity.toString());
        });
    };
    return ActivityLogService;
})();
exports.ActivityLogService = ActivityLogService;
//# sourceMappingURL=applicationActivityService.js.map