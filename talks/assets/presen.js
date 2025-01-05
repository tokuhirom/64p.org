(function () {
    const Presen = {
        start_time: new Date()
    };

    Presen.init = function (data) {
        this.data = data;

        this.init_sections();
        this.init_title();
        this.init_page();
        this.format_cache = [];
        this.rewrite();

        document.getElementById("total_page").textContent = Presen.sections.length;

        setInterval(Presen.cron, 1000);
    };

    Presen.init_page = function () {
        this.page = location.hash === "" ? 0 : Number(location.hash.substr(1));
    };

    Presen.init_sections = function () {
        const sections = [[]];
        const topic_reg = /^----/;
        this.data.forEach(line => {
            if (topic_reg.test(line)) {
                sections.push([line]);
            } else {
                sections[sections.length - 1].push(line);
            }
        });
        this.sections = sections;
    };

    Presen.init_title = function () {
        const titles = this.sections[0];
        document.title = titles[0];
        document.getElementById("title").textContent = titles[0];
    };

    Presen.has_next = function () {
        return this.page < this.sections.length - 1;
    };

    Presen.next = function () {
        if (this.has_next()) {
            this.page++;
            this.rewrite();
        }
    };

    Presen.has_prev = function () {
        return this.page > 0;
    };

    Presen.prev = function () {
        if (this.has_prev()) {
            this.page--;
            this.rewrite();
        }
    };

    Presen.cron = function () {
        const now = new Date();
        document.getElementById("time").textContent = now.hms();

        document.getElementById("current_page").textContent = Presen.page + 1;

        const used_time = Math.floor((now - Presen.start_time) / 1000);
        const used_min = Math.floor(used_time / 60);
        const used_sec = used_time % 60;
        document.getElementById("used_time").textContent = `${Presen.two_column(used_min)}:${Presen.two_column(used_sec)}`;

        document.getElementById("footer").style.top = `${document.documentElement.clientHeight - 50}px`;

        const bodyWidth = document.documentElement.clientWidth;
        const topic = document.getElementById("topics");
        if (topic.offsetWidth > bodyWidth) {
            topic.textContent = ` ${topic.offsetWidth} ${bodyWidth}`;
        }

        const pageInfo = document.getElementById("page_info");
        pageInfo.style.left = `${document.body.clientWidth - pageInfo.offsetWidth}px`;

        document.querySelectorAll("#topics pre").forEach(pre => {
            pre.style.fontSize = Presen.pre_font_size;
        });
    };

    Presen.rewrite = function () {
        const p = this.page;
        if (!this.format_cache[p]) {
            this.format_cache[p] = this.format(this.sections[p]);
        }
        const [content, preFontSize] = this.format_cache[p];
        document.getElementById("topics").innerHTML = content;
        this.pre_font_size = preFontSize;
        location.hash = `#${p}`;
    };

    Presen.format = function (lines) {
        const context = [];
        let mode = "p";
        let pre_max = 0;
        lines.forEach(line => {
            if (/^----$/.test(line)) {
                return;
            }

            if (/^(\*\s)/.test(line)) {
                context.push(`<h2>${line.replace(/^\*+/, "")}</h2>`);
                return;
            }
            if (/^(\*+)/.test(line)) {
                context.push(`<h3>${line.replace(/^\*+/, "")}</h3>`);
                return;
            }
            if (/^\-\-/.test(line)) {
                context.push(`<span class="list_child">&nbsp;&nbsp;* ${line.replace(/^\-\-/, "")}</span><br />`);
                return;
            }
            if (/^\-/.test(line)) {
                context.push(`<span class="list">● ${line.replace(/^\-+/, "")}</span><br/>`);
                return;
            }

            if (/^>\|\|/.test(line)) {
                mode = "pre";
                context.push("<pre>");
                return;
            }
            if (/^\|\|</.test(line)) {
                mode = "p";
                context.push("</pre>");
                return;
            }

            if (mode === "pre") {
                pre_max = Math.max(line.length, pre_max);
                context.push(`${line.escapeHTML().replace(/&lt;B&gt;/g, "<B>").replace(/&lt;\/B&gt;/g, "</B>")}\n`);
            } else {
                context.push(`<span>${line}</span><br>`);
            }
        });

        const pre_font_size = `${Math.floor(document.documentElement.clientWidth / pre_max + 10)}px`;
        return [context.join(""), pre_font_size];
    };

    Presen.two_column = function (i) {
        return i.toString().padStart(2, "0");
    };

    Date.prototype.hms = function () {
        return `${this.getHours()}:${Presen.two_column(this.getMinutes())}:${Presen.two_column(this.getSeconds())}`;
    };

    String.prototype.escapeHTML = function () {
        return this.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    };

    Presen.change_font_size = function (selector, factor) {
        const element = document.querySelector(selector);
        const currentFontSize = parseInt(window.getComputedStyle(element).fontSize, 10);
        const newFontSize = `${currentFontSize + factor}px`;
        element.style.fontSize = newFontSize;

        Presen.pre_font_size = `${parseInt(Presen.pre_font_size, 10) + factor}px`;
    };

    Presen.observe_key_event = function () {
        document.addEventListener("keydown", e => {
            switch (e.keyCode) {
                case 82: // r
                    location.reload();
                    break;

                case 80: // p
                case 75: // k
                case 38:
                    Presen.prev();
                    e.stopPropagation();
                    break;

                case 78: // n
                case 74: // j
                case 40:
                    Presen.next();
                    e.stopPropagation();
                    break;

                case 70: // f
                    document.getElementById("footer").classList.toggle("hidden");
                    e.stopPropagation();
                    break;

                case 190: // > and .
                    Presen.change_font_size("#topics", +10);
                    break;

                case 188: // < and ,
                    Presen.change_font_size("#topics", -10);
                    break;
            }
        });
    };

    document.addEventListener("DOMContentLoaded", () => {
        fetch("main.txt")
            .then(response => response.text())
            .then(text => {
                try {
                    Presen.init(text.split("\n"));
                } catch (e) {
                    alert(e);
                }
            });

        Presen.observe_key_event();
    });
})();
