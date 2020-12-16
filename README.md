# Personalized-infokiosk
Στα πλαίσια του έργου ΜΝΑΕ 2020 (Μία νέα αρχή για τα ΕΠΑΛ) η ομάδα των μαθητών του 1ου ΕΠΑΛ Ρεθύμνου με τη βοήθεια του καθηγητή τους Βεργεράκη Παναγιώτη κατασκεύασε ένα σύστημα προσωποποιημένης ενημέρωσης.
Το σύστημα βασίζεται σε μία ποικιλία τεχνολογιών όπως NFC κάρτες - Αισθητήρες αφής - MQTT επικοινωνία. Η ανάπτυξη του κώδικα βασίστηκε κυρίως σε Python και JS

Στο συγκεκριμένο αποθετήριο περιλαμβάνεται 
- Το περιβάλλον διεπαφής με τον χρήστη (HTML + JS)
- Ο κώδικας σε Python για τo σύστημα αναγνώρισης της κάρτας NFC συνδεμένο σε ένα NFC card reader (ACR122U) και της ανάγνωσης των αισθητήρων αφής (ανάγνωσε σειρικής θύρας συνδεμένης με ένα arduino uno)
- Ο κώδικας για το Arduino Uno όπου απλά καταγράφη ποιος αισθητήρας αφής έχει ενεργοποιηθεί και το στέλνει στη σειριακή θύρα για να το διαβάσει η Python

Για την επικοινωνία της Python με τη JS επιλέχθηκε η λύση του MQTT (IOT τεχνολογία). Στο συγκεκριμένο project έχει γίνει χρήση ενός MQTT broker που έχει εγκατασταθεί σε server του σχολείου μας. Μπορεί όμως να χρησιμοπιηθεί οποιοσδήποτε broker αλλάζοντας απλά την ip στον κώδικα. π.χ. https://www.hivemq.com/public-mqtt-broker/
