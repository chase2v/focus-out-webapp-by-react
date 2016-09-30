let http = require('http');
let fs = require('fs');
let qs =require('querystring');

function updateUsers() {
	let users = fs.readFileSync('./user.json');
	return users = JSON.parse(users).data;
}

http.createServer((req, res) => {
	let data = '';
	let users = updateUsers();

	req.on('data', chunk => {
		data += chunk;
	});
	req.on('end', () => {
		let parsedData = qs.parse(data);
		console.log(parsedData);
		if (parsedData.type === 'signup') {	
			delete parsedData.type;
			let t = true;
			users.forEach( v => {
				if (v.username === parsedData.username) {
					res.write('创建失败');
					res.end();
					t = false;
				}
			});

			if (t) {
				parsedData.id = users.length + 1;
				users.push(parsedData);
				let json = {
					data: users
				}
				json = JSON.stringify(json);
				fs.writeFileSync('./user.json', json);
				res.write('创建成功');
				res.end();
			}
		} else {
			let t = false;
			users.forEach( v => {
				if (v.username === parsedData.username && v.password === parsedData.password) {
					res.write('登录成功');
					res.end();
					t = true;
				}
			});

			if (!t) {
				res.write('登录失败');
				res.end();
			}
		}
	});
	res.setHeader('Access-Control-Allow-Origin', '*');
})
.listen(1234);
console.log('我们起了一个服务器监听在端口' + 1234);
