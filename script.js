const home = document.getElementById('Home');
        const menu = document.getElementById('Menu');
        const clkhome = document.getElementById('Clickhome')
        const clkmenu = document.getElementById('Clickmenu')
        const buttons = document.querySelectorAll(".buy-btn");
        const buysload = document.getElementById("buy-sload")


        clkhome.onclick = () => {

            menu.style.display = "none";
            home.style.display = "block";
            buysload.style.display = "none"
            console.log("first")
        }

        clkmenu.onclick = () => {

            home.style.display = "none";
            menu.style.display = "block";
            buysload.style.display = "none"
            console.log("first")
        }


        buttons.forEach(button => {
            button.addEventListener("click", function () {
                home.style.display = "none";
                menu.style.display = "none";
                buysload.style.display = "block"
            });
        });





        let subtotal = 0;
        let totalItems = 0;

        const btn = document.querySelectorAll(".btn");

        btn.forEach(button => {
            button.addEventListener("click", function () {

                const row = this.closest("tr");
                const name = row.children[1].innerText;
                const price = parseFloat(row.children[2].innerText);
                const stockCell = row.children[3];
                let stock = parseInt(stockCell.innerText);

                // ถ้าสต็อกหมด
                if (stock <= 0) {
                    alert("สินค้าหมดแล้ว");
                    this.disabled = true;
                    return;
                }

                // ลด stock
                stock--;
                stockCell.innerText = stock;

                // ถ้าลดแล้วเหลือ 0 ให้ปิดปุ่ม
                if (stock === 0) {
                    alert(name + " หมดสต็อกแล้ว");
                    this.disabled = true;
                }

                // เพิ่มจำนวนสินค้า
                totalItems++;
                subtotal += price;

                // แสดงรายการที่สั่งซื้อ
                const li = document.createElement("li");
                li.innerText = name + " - " + price + " บาท";
                document.getElementById("order-list").appendChild(li);

                // ส่วนลด 10% เมื่อซื้อครบ 5 ชิ้นขึ้นไป
                let discount = 0;
                if (totalItems >= 5) {
                    discount = subtotal * 0.10;
                }

                const afterDiscount = subtotal - discount;
                const vat = afterDiscount * 0.07;
                const total = afterDiscount + vat;

                // แสดงผล
                document.getElementById("item-count").innerText = totalItems;
                document.getElementById("subtotal").innerText = subtotal.toFixed(2);
                document.getElementById("discount").innerText = discount.toFixed(2);
                document.getElementById("vat").innerText = vat.toFixed(2);
                document.getElementById("total").innerText = total.toFixed(2);
            });
        });