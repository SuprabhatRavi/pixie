use wasm_bindgen::prelude::*;
use web_sys::console;

#[wasm_bindgen]
pub fn apply_grayscale(data: &[u8], width: u32, height: u32) -> Result<Vec<u8>, JsValue> {
    console::log_1(&format!("Received buffer length: {}", data.len()).into());
    
    let expected_length = (width * height * 4) as usize;
    console::log_1(&format!("Expected length: {}", expected_length).into());
    
    if data.len() != expected_length {
        return Err(JsValue::from_str(&format!(
            "Invalid input buffer length. Expected {}, got {}",
            expected_length, data.len()
        )));
    }
    
    let mut result = Vec::with_capacity(expected_length);
    for (i, chunk) in data.chunks_exact(4).enumerate() {
        let gray = ((chunk[0] as u32 * 299 +
                     chunk[1] as u32 * 587 +
                     chunk[2] as u32 * 114) / 1000) as u8;
        result.extend_from_slice(&[gray, gray, gray, chunk[3]]);
    }
    
    Ok(result)
}
