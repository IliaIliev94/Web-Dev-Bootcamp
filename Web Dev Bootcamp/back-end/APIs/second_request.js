let OAuth = require("oauth");
let header = {
    "X-Yahoo-App-Id": "mhR6RZ72"
};

let request = new OAuth.OAuth(
    null,
    null,
    'dj0yJmk9QTF3cHo4VmZHZ29vJmQ9WVdrOWJXaFNObEphTnpJbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWI0',
    'bcb1f66f22feef5793020fa05a5da3e150326502',
    '1.0',
    null,
    'HMAC-SHA1',
    null,
    header
);

request.get(
    'https://weather-ydn-yql.media.yahoo.com/forecastrss?location=sofia,bg&format=json',
    null,
    null,
    function (err, data, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(JSON.parse(data))
        }
    }
);