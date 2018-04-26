1. Общий подход к решению задачи

 1.1 - сделана авторизация и логинизация согласно условию задачи
 
 1.2 - на сервере сделан один роут(post),
 который согласно условию задачианализирует получено '-' или "ничего" в переменной count
 1.2.1 Если получен '-' на сервер, то дальше делается 2 действия
   1.2.1.1 удаляются все записи с базы данных
   1.2.1.2 добавляется одна запись с значением '1'.
 1.2.2 Если получено "ничего" через урл в count, то возникает ошиибка, а это означает что на сервер
       было что-то передано и это не '-'. Поскольку з интерфейса и типа поля number нам могли
	   передать только число, то ми проверяем ожидаемое ли это число фибоначчи или нет
	   1.2.2.1 Если это ожидаемое число, тогда записуем его в базу данных, генерируем следующее число последовательности
		       и записываем и его в базу данных, а потом передаем его на клиентскую часть
	   1.2.2.2 Если это не ожидаемое число последовательности, тогда возращаем на клиентскую часть '-'
	   
 1.3 В интерфейсе согласно условию задачи указано - кто делал, когда и версия.
 
 1.4 Для управления есть поле ввода числа, которое будет отправлено на сервер и две кнопки
   1.4.1 Кнопка "Надіслати" отсылает значения инпута на сервер. 
   1.4.2 Кнопка "Перевести в поч стан" - отсылает на сервер '-' и соответственно обнуляет базу
         данных оставляя в ней только одно значение - '1'
		 
 1.5 Согласно условию задачи делается вывод последнего числа присланного сервером
 
 1.6 Также делается вывод всех запросов на сервер и его ответов с указанием времени когда делался запросов
     и присылался ответ(+- 1 секунда задерка аппаратного дейсвия)

2. Инструкцыя пользователя
 
 2.1 Чтобы запустить локально програму нужно запустить файл server.js
 
 2.2 После регистрации и логинизации нужно нажать кнопку "Перевести в поч стан" -чтобы обновить базу и последовательность
     от предыдущих действий
	 
 2.3 Потом ввести ожидаемое число в поле ввода и нажать кнопку "Надіслати"

 2.4 Далее сервер возращает значение и согласно нему сможет ориентироваться что отсылать дальше 
	 
