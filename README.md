## Стартовый репозиторий

Это ASP.NET Core приложение с React кодом на фронтенде.

### Пре-реквизиты

1. dotnet core версии 3.1, скачать можно [здесь](https://dotnet.microsoft.com/download).  
   Будет работать и с dotnet 5.0, но тогда нужно изменить поле `TargetFramework` в файле `src/covidSim.csproj` на `dotnet5.0`, и поправить скрипт деплоя в Azure `.github/workflows/main_speedytemplate.yml`
2. nodejs версии lts или current, скачать можно [здесь](https://nodejs.dev/download/)

### Локальный запуск проекта

Для построения и запуска приложения

1. перейди в директорию `src`
2. выполни `dotnet run --environment Development`.
3. при первом запуске dotnet может предложить установить dev сертификаты, нужно согласиться, чтобы работал https

Также приложение можно запустить под отладкой в IDE обычным образом: открой sln-файл и запусти отладку.

Фронт расположен в директории `ClientApp`.

Веб-сервер будет запускаться в режиме разработки с горячей заменой фронтенд-кода,
чтобы можно было сразу видеть результат после редактирования js-кода.

Для обновления бэкенда придется перестроить и запустить заново все приложение.
