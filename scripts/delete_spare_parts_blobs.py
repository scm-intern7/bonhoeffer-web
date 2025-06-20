import os
from vercel_blobs import delete_blob

# List of all spare part image filenames (from your public/spare-parts folder)
filenames = [
    '1_kit-de-piston.png', '2_anillos-de-piston.png', '3_carburetor.png', '4_kit-de-reparacion-del-carburetor-.png',
    '5_cadena-de-motosierra.png', '5_manguera-combustible-_-bulbo-de-imprimacion.png', '7_kit-de-cilindro.png',
    '8_cabezal-de-motoguadana.png', '9_repuestos-de-cabezal.png', '10_nyon-de-motoguadana.png',
    '11_espada-de-motosierra.png', '12_espada-con-punta-dura.png', '13_arrancador.png', '14_cuerda-de-arranque.png',
    '15_cuerda-metallica-cuerda.png', '16_filtro-de-aire.png', '17_filtro-de-combustible.png', '18_bomba-de-aciete.png',
    '19_pinion.png', '20_pinion-con-rim.png', '21_emberague-tambor-de-emberague.png', '22_campana-de-clutch.png',
    '23_caja-de-engranaje.png', '24_repuestos-de-caja-de-engranaje.png', '25_montaje.png', '26_bobina-de-encendido.png',
    '27_ciguenal.png', '28_eje-para-motoguadana.png', '29_cuchillas-de-2-3-dientes-para-motoguadana.png',
    '30_cuchillas-redondas-para-motoguadana.png', '31_partes-de-goma-motosierra-china.png', '32_manguera-de-riego.png',
    '33_mangeura-de-jardin-expandible.png', '34_acoples-aluminio.png', '35_junta-de-acoplamiento-de-aluminio.png',
    '36_arnes-profesional-para-motoguadana.png', '37_llantas-para-cortacesped.png', '38_manguera-de-fumigacion-de-alta-presion.png',
    '39_repuestos-de-fumigacion.png', '40_rodamientos-baleeros.png', '41_accesorios-de-cadena-de-motosierra.png',
    '42_bujias.png', '44_pistola-de-aire.png', '47_herramient-as-de-jardin.png', '48_helice-de-cola-larga.png',
    '49_proteccion-para-los-ojos.png', '50_proteccion-para-la-cabeza-combinacion-de-casco.png', '51_drill.png',
    '51_proteccion-respiratoria.png', '52_electrodes-and-wire.png', '53_protección-facial.png'
]

for filename in filenames:
    try:
        print(f"Deleting blob: {filename}")
        delete_blob(filename)
    except Exception as e:
        print(f"Failed to delete {filename}: {e}")
