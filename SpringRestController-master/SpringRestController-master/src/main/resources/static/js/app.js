const API_BASE_URL = '/banque/comptes';

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    loadComptes();
    setupForm();
    setDefaultDate();
});

// Configuration du formulaire
function setupForm() {
    const form = document.getElementById('compteForm');
    form.addEventListener('submit', handleFormSubmit);
    
    document.getElementById('cancelBtn').addEventListener('click', resetForm);
}

// Définir la date par défaut (aujourd'hui)
function setDefaultDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('dateCreation').value = today;
}

// Charger tous les comptes
async function loadComptes() {
    const container = document.getElementById('comptes-container');
    const loading = document.getElementById('loading');
    const errorMessage = document.getElementById('error-message');
    
    loading.style.display = 'block';
    errorMessage.style.display = 'none';
    container.innerHTML = '';
    
    try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) throw new Error('Erreur lors du chargement des comptes');
        
        const comptes = await response.json();
        loading.style.display = 'none';
        
        // Mettre à jour les statistiques
        updateStats(comptes);
        
        if (comptes.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">🏦</div>
                    <div class="empty-state-text">Aucun compte trouvé</div>
                    <div class="empty-state-subtext">Ajoutez votre premier compte pour commencer</div>
                </div>
            `;
        } else {
            comptes.forEach((compte, index) => {
                setTimeout(() => {
                    container.appendChild(createCompteCard(compte));
                }, index * 100);
            });
        }
    } catch (error) {
        loading.style.display = 'none';
        errorMessage.textContent = `Erreur: ${error.message}`;
        errorMessage.style.display = 'block';
        console.error('Erreur:', error);
    }
}

// Mettre à jour les statistiques
function updateStats(comptes) {
    const statsDiv = document.getElementById('headerStats');
    const totalComptes = document.getElementById('totalComptes');
    const soldeTotal = document.getElementById('soldeTotal');
    
    if (comptes.length > 0) {
        const total = comptes.reduce((sum, compte) => sum + compte.solde, 0);
        totalComptes.textContent = comptes.length;
        soldeTotal.textContent = formatMoney(total) + ' €';
        statsDiv.style.display = 'flex';
    } else {
        statsDiv.style.display = 'none';
    }
}

// Créer une carte de compte
function createCompteCard(compte) {
    const card = document.createElement('div');
    card.className = 'compte-card';
    card.setAttribute('data-id', compte.id);
    
    const date = new Date(compte.dateCreation).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const typeClass = compte.type.toLowerCase();
    const typeLabel = compte.type === 'COURANT' ? 'Compte Courant' : 'Compte Épargne';
    
    card.innerHTML = `
        <div class="compte-card-header">
            <span class="compte-id">#${compte.id}</span>
            <span class="type-badge ${typeClass}">${typeLabel}</span>
        </div>
        <div class="compte-details">
            <div class="detail-item">
                <span class="detail-label">Solde:</span>
                <span class="detail-value solde-value">${formatMoney(compte.solde)} €</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Date de création:</span>
                <span class="detail-value">${date}</span>
            </div>
        </div>
        <div class="compte-actions">
            <button class="btn btn-edit" onclick="editCompte(${compte.id})">✏️ Modifier</button>
            <button class="btn btn-delete" onclick="deleteCompte(${compte.id})">🗑️ Supprimer</button>
        </div>
    `;
    
    return card;
}

// Formater l'argent
function formatMoney(amount) {
    return new Intl.NumberFormat('fr-FR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

// Gérer la soumission du formulaire
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = {
        solde: parseFloat(document.getElementById('solde').value),
        dateCreation: document.getElementById('dateCreation').value,
        type: document.getElementById('type').value
    };
    
    const compteId = document.getElementById('compteId').value;
    const isEdit = compteId !== '';
    
    try {
        const url = isEdit ? `${API_BASE_URL}/${compteId}` : API_BASE_URL;
        const method = isEdit ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(isEdit ? { ...formData, id: parseInt(compteId) } : formData)
        });
        
        if (!response.ok) throw new Error('Erreur lors de la sauvegarde');
        
        resetForm();
        loadComptes();
        showSuccessMessage(isEdit ? 'Compte mis à jour avec succès!' : 'Compte ajouté avec succès!');
    } catch (error) {
        showErrorMessage(`Erreur: ${error.message}`);
        console.error('Erreur:', error);
    }
}

// Modifier un compte
async function editCompte(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        if (!response.ok) throw new Error('Erreur lors du chargement du compte');
        
        const compte = await response.json();
        
        // Remplir le formulaire
        document.getElementById('compteId').value = compte.id;
        document.getElementById('solde').value = compte.solde;
        
        // Formater la date pour l'input date
        const date = new Date(compte.dateCreation);
        const formattedDate = date.toISOString().split('T')[0];
        document.getElementById('dateCreation').value = formattedDate;
        
        document.getElementById('type').value = compte.type;
        
        // Changer le mode du formulaire
        document.getElementById('form-title').textContent = 'Modifier le compte';
        document.getElementById('submitBtn').textContent = 'Mettre à jour';
        document.getElementById('cancelBtn').style.display = 'block';
        
        // Scroll vers le formulaire
        document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        showErrorMessage(`Erreur: ${error.message}`);
        console.error('Erreur:', error);
    }
}

// Supprimer un compte
async function deleteCompte(id) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce compte ? Cette action est irréversible.')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) throw new Error('Erreur lors de la suppression');
        
        loadComptes();
        showSuccessMessage('Compte supprimé avec succès!');
    } catch (error) {
        showErrorMessage(`Erreur: ${error.message}`);
        console.error('Erreur:', error);
    }
}

// Réinitialiser le formulaire
function resetForm() {
    document.getElementById('compteForm').reset();
    document.getElementById('compteId').value = '';
    document.getElementById('form-title').textContent = 'Ajouter un nouveau compte';
    document.getElementById('submitBtn').textContent = 'Ajouter';
    document.getElementById('cancelBtn').style.display = 'none';
    setDefaultDate();
}

// Afficher un message de succès
function showSuccessMessage(message) {
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = message;
    errorDiv.style.background = '#d1fae5';
    errorDiv.style.color = '#065f46';
    errorDiv.style.borderLeftColor = '#10b981';
    errorDiv.style.display = 'block';
    
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 3000);
}

// Afficher un message d'erreur
function showErrorMessage(message) {
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = message;
    errorDiv.style.background = '#fee2e2';
    errorDiv.style.color = '#991b1b';
    errorDiv.style.borderLeftColor = '#ef4444';
    errorDiv.style.display = 'block';
    
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}

