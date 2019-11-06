export default function (code) {
    code.replace('/if/', '<span className="code_if">if</span>')
    return code
}