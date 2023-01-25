<template>
  <div class="about">
    <div class="background-blue"></div>

    <!-- Tópico 1 -->
    <h1 class="title">
      O <span class="text-indigo-600">Partager Player</span> é o lugar perfeito
      para os amantes de música!
    </h1>
    <p class="paragraph">
      Um aplicativo onde pequenos artistas podem mostrar suas habilidades e os
      fãs descobrirem novos sons ou apenas curtirem suas músicas preferidas!
      <br /><br />
      Com a opção de upload de músicas e comentários, torna-se uma plataforma
      interativa e divertida para todos, descubra novos artistas e conecte-se
      com outros amantes da música.. Não importa se você é um artista procurando
      mostrar suas habilidades ou procurando novas sonoridades para curtir,
      <span class="text-indigo-600">Partarger Player</span> é o lugar perfeito
      para você!
    </p>

    <!-- Tópico 2 -->
    <h1 class="title">
      Como o <span class="text-indigo-600">Partager Player</span> nasceu
    </h1>
    <p class="paragraph">
      De uma simples ideia de um amante de música
      <span class="text-indigo-600 italic font-medium"
        >criar um lugar onde as pessoas pudessem compartilhar e se conectarem
        através da música.</span
      >
      E assim, nascendo um aplicativo fácil de usar, onde os usuários podem
      fazer upload, compartilhar e comentar suas músicas preferidas ou autorais.
      <br /><br />
      Visando em criar uma comunidade amigável e acolhedora. Onde o Partager
      Player, possa ser um lugar onde as pessoas pudessem se conectar através da
      música e celebrá-la juntas.
    </p>

    <!-- Tópico 3 -->
    <h1 class="title">Sinta-se livre para compartilhar sugestões ao projeto</h1>
    <!-- formulário sugestões -->
    <form action="" class="about-form">
      <div class="name_input">
        <label for="name">Nome:</label><br />
        <input type="text" name="name" placeholder="Joab Manoel" />
      </div>

      <div class="email_input">
        <label for="email">Email:</label><br />
        <input type="email" name="email" placeholder="joab_manoel@email.com" />
      </div>

      <div class="text_area">
        <label for="msg">Sua mensagem:</label><br />
        <textarea name="msg" placeholder="lorem ipsum dolor..."></textarea>
      </div>

      <button>Enviar</button>
    </form>
  </div>
</template>

<style>
.background-blue {
  content: "";
  height: 200px;
  width: 100%;
  background-color: #2778f2;

  overflow: hidden;
}

.about {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  margin-top: 50px;
  width: 732px;

  font-weight: 700;
  font-size: 39px;
  line-height: 47px;

  text-align: center;
}

.paragraph {
  margin: 35px 0 10px 0;
  width: 628px;

  font-weight: 500;
  font-size: 17px;
  line-height: 20px;
  text-align: justify;

  color: #000000;
}

.about-form {
  padding: 45px 20px;
  width: 460px;
  height: 391px;

  margin-top: 50px;
  border: 1px solid #d9d9d9;
  border-radius: 16px;

  display: flex;
  flex-wrap: wrap;
  gap: 18px;

  background: white;
}

.name_input label {
  font-weight: 600;
  font-size: 15px;

  color: #000000;
}

.name_input input {
  padding: 13px 10px;
  width: 168px;
  height: 41px;

  border: 1px solid #d9d9d9;
  border-radius: 5px;
}

.email_input label {
  font-weight: 600;
  font-size: 15px;

  color: #000000;
}

.email_input input {
  padding: 13px 10px;
  width: 222px;
  height: 41px;

  border: 1px solid #d9d9d9;
  border-radius: 5px;
}

.text_area label {
  font-weight: 600;
  font-size: 15px;

  color: #000000;
}

.text_area textarea {
  padding: 13px 10px;

  width: 409px;
  height: 151px;

  border: 1px solid #d9d9d9;
  border-radius: 5px;
  resize: none;
}

.about-form button {
  margin: 0 30%;
  padding: 12px 63px;
  color: white;

  border: 1px solid #d9d9d9;
  background: #232323;
  border-radius: 3px;
}

@media (max-width: 500px) {
  .about {
    margin: 20px auto 0;
  }
  .title {
    margin-top: 50px;
    width: 332px;

    font-weight: 700;
    font-size: 20px;
    line-height: 25px;
  }

  .paragraph {
    margin: 35px 0 10px 0;
    width: 288px;

    font-weight: 500;
    font-size: 13px;
    line-height: 20px;
    text-align: justify;

    color: #000000;
  }

  .about-form {
    padding: 45px 20px;
    width: 460px;
    height: 391px;

    margin-top: 50px;
    border: 1px solid #d9d9d9;
    border-radius: 16px;

    display: none;
    flex-wrap: wrap;
    gap: 18px;

    background: white;
  }

  .name_input label {
    font-weight: 600;
    font-size: 15px;

    color: #000000;
  }

  .name_input input {
    padding: 13px 10px;
    width: 168px;
    height: 41px;

    border: 1px solid #d9d9d9;
    border-radius: 5px;
  }

  .email_input label {
    font-weight: 600;
    font-size: 15px;

    color: #000000;
  }

  .email_input input {
    padding: 13px 10px;
    width: 222px;
    height: 41px;

    border: 1px solid #d9d9d9;
    border-radius: 5px;
  }

  .text_area label {
    font-weight: 600;
    font-size: 15px;

    color: #000000;
  }

  .text_area textarea {
    padding: 13px 10px;

    width: 409px;
    height: 151px;

    border: 1px solid #d9d9d9;
    border-radius: 5px;
    resize: none;
  }

  .about-form button {
    margin: 0 30%;
    padding: 12px 63px;
    color: white;

    border: 1px solid #d9d9d9;
    background: #232323;
    border-radius: 3px;
  }
}
</style>
