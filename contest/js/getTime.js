$.get('https://contests.sdutacm.cn/contests.json', function (data) {
        data.forEach(item => {
            let start_time = new Date(item.start_time);
            let end_time = new Date(item.end_time);
            let timeLeft = Math.floor((start_time - new Date()) / 1000 / 60); //以分钟保存的时间差
            console.log(timeLeft)
            let countdown = Math.floor((start_time - new Date()) / 60 / 60 / 24 / 1000);
            if (countdown < 0) {
                countdown = countdown? '进行中':'即将开始'
            }
            else{
                countdown = ""
                if (timeLeft > 1440)
                {
                    countdown += Math.floor(timeLeft/1440) + "day ";
                    timeLeft %= 1440;
                }
                countdown += Math.floor(timeLeft/60) + "h " + Math.floor(timeLeft%60) + "m"
            }
            start_time = formatDate(start_time);
            end_time = formatDate(end_time);
            let tr = `<tr>
                        <td>${convertSource(item.source)}</td>
                        <td><a href="${item.link}" target="_blank">${item.name}</a></td>
                        <td>${start_time}</td>
                        <td>${end_time}</td>
                        <td>${countdown}</td>
                    </tr>`
            $('#main').append(tr)
        });
    })

    function convertSource(source) {
        switch (source) {
            case 'jisuanke': return '计蒜客'
            case 'nowcoder': return '牛客网'
            case 'luogu': return '洛谷'
        }
        return source
    }

    function formatDate(date) {
        time_utc = date.getTime() + 8*60*60; // 获取现在时间
        date = new Date(time_utc);  // 定义了一个时间类
        function change_time(temp) {  // 字符串 9 表示为 09
            return temp < 10 ? '0' + temp : temp;
        }
        Y = date.getFullYear() + '-';
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1)+ '-';
        D = change_time(date.getDate()) + ' ';
        h = change_time(date.getHours()) + ':';
        m = change_time(date.getMinutes());
        return Y+M+D+h+m;
    };