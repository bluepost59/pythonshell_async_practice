const { PythonShell } = require("python-shell");


async function main() {
    let result = "";

    // こんな感じで逐次実行っぽいことができる
    await timeout_promise();
    result = await runstr();

    console.log(result);
}

// PythonShellのPromise
function runstr() {
    // Promiseに与える引数: resolve:functionを引数にし、
    // 中でresolve()を再帰的に呼び出す。
    // 中で呼び出すときの引数に解決したときにreturnしてほしい値を書く。

    return new Promise(resolve => {
        PythonShell.runString(
            'import json; print(json.dumps({"hoge":3.14}))',
            { mode: "json" },
            (err, res) => { resolve(res) });
    });
}

// awaitの効果を見るためにタイマーを使うだけのPromise
function timeout_promise() {
    // こっちのほうがわかりやすい
    return new Promise(resolve => { setTimeout(resolve, 3000); })
}

main();