webpackJsonp([5],{769:function(n,s){n.exports={content:["article",["blockquote",["p","\u6b64\u6587\u6863\u9002\u914d\u4e8elor v0.3.0+\u7248\u672c"]],["p","\u5728\u5339\u914d\u7684\u65f6\u5019\u5c06\u4f18\u5148\u5339\u914d\u7cbe\u786e\u8def\u7531\uff0c\u5176\u6b21\u518d\u5339\u914d\u901a\u914d\u7b26\u8def\u7531\uff08named route),\u5982\u4ee5\u4e0b\u793a\u4f8b\uff1a"],["pre",{lang:"lua",highlighted:'app<span class="token punctuation">:</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"/test"</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next<span class="token punctuation">)</span> <span class="token comment" spellcheck="true">--\u2460</span>\n    res<span class="token punctuation">:</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">"test"</span><span class="token punctuation">)</span>\n<span class="token keyword">end</span><span class="token punctuation">)</span>\n\napp<span class="token punctuation">:</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"/test/exact"</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next<span class="token punctuation">)</span> <span class="token comment" spellcheck="true">--\u2461</span>\n    res<span class="token punctuation">:</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">"exact"</span><span class="token punctuation">)</span>\n<span class="token keyword">end</span><span class="token punctuation">)</span>\n\napp<span class="token punctuation">:</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"/test/:foo"</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next<span class="token punctuation">)</span> <span class="token comment" spellcheck="true">--\u2462</span>\n    <span class="token keyword">local</span> param <span class="token operator">=</span> req<span class="token punctuation">.</span>params<span class="token punctuation">.</span>foo\n    res<span class="token punctuation">:</span><span class="token function">send</span><span class="token punctuation">(</span>param<span class="token punctuation">)</span>\n<span class="token keyword">end</span><span class="token punctuation">)</span>'},["code",'app:get("/test", function(req, res, next) --\u2460\n    res:send("test")\nend)\n\napp:get("/test/exact", function(req, res, next) --\u2461\n    res:send("exact")\nend)\n\napp:get("/test/:foo", function(req, res, next) --\u2462\n    local param = req.params.foo\n    res:send(param)\nend)']],["p","\u8bbf\u95ee\u4ee5\u4e0burl\u65f6\u5bf9\u5e94\u7684\u8def\u7531\u5206\u522b\u662f\uff1a"],["ul",["li",["p",'"/test": \u7531\u8def\u7531\u2460\u5904\u7406']],["li",["p",'"/test/exact": \u67e5\u627e\u5230',["code",'app:get("/test/exact")'],", \u6240\u4ee5\u7531\u8def\u7531\u2461\u5904\u7406"]],["li",["p",'"/test/other": \u6ca1\u6709\u67e5\u627e\u5230\u7cbe\u786e\u8def\u7531\uff0c\u4f46\u67e5\u627e\u5230\u4e86named router(',["code",'app:get("/test/:foo")'],"), \u6240\u4ee5\u7531\u8def\u7531\u2462\u5904\u7406"]],["li",["p",'"/test/other/bar": \u6ca1\u6709\u67e5\u627e\u5230\u4efb\u4f55\u8def\u7531\uff0c \u8fd4\u56de',["code","404"],"\u9519\u8bef"]]]],meta:{title:"\u8def\u7531\u4f18\u5148\u7ea7",type:"\u8def\u7531",order:104,filename:"docs/route_priority.zh-CN.md"},toc:["ul"]}}});