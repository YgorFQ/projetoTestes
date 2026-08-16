(function () {
  function isEnabled() {
    return Boolean(
      window.SenkoFirebase &&
      window.SenkoFirebase.isEnabled &&
      window.SenkoFirebase.isEnabled()
    );
  }

  function repository() {
    return isEnabled() ? window.SenkoColecoesFirebase : null;
  }

  function errorMessage(error, fallback) {
    var code = String(error && error.code || '').replace('functions/', '');
    if (code === 'aborted') {
      return 'Outra pessoa salvou uma versao mais recente. Seu rascunho foi preservado.';
    }
    if (code === 'already-exists') return 'Ja existe outro item com esse nome.';
    if (code === 'permission-denied' || code === 'unauthenticated') {
      return 'Sua conta nao tem permissao para alterar este conteudo.';
    }
    return error && error.message ? error.message : fallback;
  }

  function setBusy(button, busy, label) {
    if (!button) return;
    button.disabled = Boolean(busy);
    if (label) button.textContent = label;
  }

  function replaceAnchor(anchorId, buttonId, label, className, onClick) {
    var existing = document.getElementById(buttonId);
    if (existing) return existing;

    var anchor = document.getElementById(anchorId);
    if (!anchor) return null;

    var button = document.createElement('button');
    button.id = buttonId;
    button.type = 'button';
    button.className = className;
    button.textContent = label;
    button.addEventListener('click', onClick);
    anchor.parentNode.replaceChild(button, anchor);
    return button;
  }

  function handleFailure(button, label, error, fallback, setStatus) {
    var message = errorMessage(error, fallback);
    setBusy(button, false, label);
    if (typeof setStatus === 'function') setStatus(message);
    alert(message);
  }

  function currentCollection() {
    return window._colCurrentCollection || null;
  }

  function currentLayout() {
    return window._colCurrentLayout || null;
  }

  function attachCreateCollection() {
    var button;
    button = replaceAnchor(
      'colCreateGhAnchor',
      'colFirebaseCreateCollection',
      'Salvar colecao',
      'col-btn-primary',
      function () {
        var data = typeof colGetCreateFormData === 'function'
          ? colGetCreateFormData()
          : null;
        var repo = repository();
        if (!data || !repo) return;

        setBusy(button, true, 'Salvando...');
        repo.saveCollection({
          slug: null,
          legacyId: data.slug,
          name: data.name,
          group: data.group,
          tags: data.tags,
          expectedVersion: null
        }).then(function () {
          setBusy(button, false, 'Colecao salva');
          setTimeout(function () {
            colCloseCreateModal();
            setBusy(button, false, 'Salvar colecao');
          }, 400);
        }).catch(function (error) {
          handleFailure(button, 'Salvar colecao', error, 'Erro ao criar a colecao.');
        });
      }
    );
  }

  function attachEditCollection() {
    var saveButton;
    saveButton = replaceAnchor(
      'colEditGhAnchor',
      'colFirebaseSaveCollection',
      'Salvar',
      'col-btn-primary',
      function () {
        var data = typeof colGetEditFormData === 'function'
          ? colGetEditFormData()
          : null;
        var collection = currentCollection();
        var repo = repository();
        if (!data || !collection || !repo) return;

        setBusy(saveButton, true, 'Salvando...');
        repo.saveCollection({
          slug: collection.slug,
          name: data.name,
          group: data.group,
          tags: data.tags,
          expectedVersion: Number(collection._firebaseVersion || 0)
        }).then(function (result) {
          collection._firebaseVersion = Number(result.version || collection._firebaseVersion || 0);
          setBusy(saveButton, false, 'Colecao salva');
          setTimeout(function () {
            colCloseEditModal();
            setBusy(saveButton, false, 'Salvar');
          }, 400);
        }).catch(function (error) {
          handleFailure(saveButton, 'Salvar', error, 'Erro ao salvar a colecao.');
        });
      }
    );

    var deleteButton;
    deleteButton = replaceAnchor(
      'colEditDeleteAnchor',
      'colFirebaseDeleteCollection',
      'Excluir',
      'col-btn-delete',
      function () {
        var collection = currentCollection();
        var repo = repository();
        if (!collection || !repo) return;

        colOpenConfirm({
          title: 'Excluir colecao',
          body: 'A colecao e todos os layouts dentro dela serao excluidos.',
          labelOk: 'Excluir',
          onConfirm: function () {
            setBusy(deleteButton, true, 'Excluindo...');
            repo.deleteCollection(collection).then(function () {
              setBusy(deleteButton, false, 'Excluir');
              colCloseEditModal();
              if (typeof colCloseCollectionModal === 'function') colCloseCollectionModal();
            }).catch(function (error) {
              handleFailure(deleteButton, 'Excluir', error, 'Erro ao excluir a colecao.');
            });
          }
        });
      }
    );
  }

  function attachCreateLayout() {
    var button;
    button = replaceAnchor(
      'colAddLayoutGhAnchor',
      'colFirebaseCreateLayout',
      'Salvar layout',
      'col-btn-primary',
      function () {
        var data = typeof colGetAddLayoutFormData === 'function'
          ? colGetAddLayoutFormData()
          : null;
        var collection = currentCollection();
        var repo = repository();
        if (!data) {
          alert('Informe um nome valido para o layout interno.');
          var nameInput = document.getElementById('colAddLayoutName');
          if (nameInput) nameInput.focus();
          return;
        }
        if (!collection || !repo) {
          alert('A colecao ainda nao esta pronta para receber layouts. Feche e abra novamente.');
          return;
        }

        setBusy(button, true, 'Salvando...');
        repo.saveLayout(collection.slug, {
          id: null,
          legacyId: data.id,
          name: data.name,
          html: data.html,
          css: data.css,
          baseRevisionId: null
        }).then(function () {
          setBusy(button, false, 'Layout salvo');
          setTimeout(function () {
            colCloseAddLayoutModal();
            setBusy(button, false, 'Salvar layout');
          }, 400);
        }).catch(function (error) {
          handleFailure(button, 'Salvar layout', error, 'Erro ao criar o layout.');
        });
      }
    );
  }

  function editorStatus(message) {
    if (window.SenkoColecoesLayoutEditor) {
      window.SenkoColecoesLayoutEditor.setStatus(message);
    }
  }

  function attachEditLayout() {
    var saveButton;
    saveButton = replaceAnchor(
      'colEditLayoutGhAnchor',
      'colFirebaseSaveLayout',
      'Salvar',
      'collection-layout-editor-btn collection-layout-editor-primary-btn',
      function () {
        var data = window.SenkoColecoesLayoutEditor
          ? window.SenkoColecoesLayoutEditor.getData()
          : null;
        var collection = currentCollection();
        var layout = currentLayout();
        var repo = repository();
        if (!data || !collection || !layout || !repo) return;

        setBusy(saveButton, true, 'Salvando...');
        editorStatus('Salvando no Firebase...');
        repo.saveLayout(collection.slug, {
          id: layout.id,
          name: data.name,
          html: data.html,
          css: data.css,
          baseRevisionId: layout._firebaseRevisionId || null
        }).then(function (result) {
          layout._firebaseRevisionId = result.revisionId || layout._firebaseRevisionId || null;
          layout._firebaseVersion = Number(result.version || layout._firebaseVersion || 0);
          setBusy(saveButton, false, 'Salvo');
          editorStatus('Layout salvo no Firebase.');
          setTimeout(function () {
            colCloseEditLayoutModal();
            setBusy(saveButton, false, 'Salvar');
          }, 500);
        }).catch(function (error) {
          handleFailure(saveButton, 'Salvar', error, 'Erro ao salvar o layout.', editorStatus);
        });
      }
    );

    var deleteButton;
    deleteButton = replaceAnchor(
      'colEditLayoutDelAnchor',
      'colFirebaseDeleteLayout',
      'Excluir',
      'collection-layout-editor-btn collection-layout-editor-danger-btn',
      function () {
        var collection = currentCollection();
        var layout = currentLayout();
        var repo = repository();
        if (!collection || !layout || !repo) return;

        colOpenConfirm({
          title: 'Excluir layout',
          body: 'Este layout sera excluido diretamente da colecao.',
          labelOk: 'Excluir',
          onConfirm: function () {
            setBusy(deleteButton, true, 'Excluindo...');
            editorStatus('Excluindo layout...');
            repo.deleteLayout(collection.slug, layout).then(function () {
              setBusy(deleteButton, false, 'Excluir');
              colCloseEditLayoutModal();
            }).catch(function (error) {
              handleFailure(deleteButton, 'Excluir', error, 'Erro ao excluir o layout.', editorStatus);
            });
          }
        });
      }
    );
  }

  function refresh() {
    if (!isEnabled()) return;
    attachCreateCollection();
    attachEditCollection();
    attachCreateLayout();
    attachEditLayout();
  }

  window.SenkoColecoesFirebaseControls = {
    refresh: refresh
  };
})();
