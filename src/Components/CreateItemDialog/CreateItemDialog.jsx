import {
    Button,
    Dialog,
    Field,
    HStack,
    Input,
    VStack
} from "@chakra-ui/react"
import { useState } from "react"
import { LuPlus } from "react-icons/lu"

export function CreateItemDialog({ isOpen, onClose, onSubmit, type = "object", isLoading = false }) {
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        stock: "",
        location: "",
        barcode: ""
    })

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(formData)
        // Reset form
        setFormData({
            name: "",
            description: "",
            category: "",
            stock: "",
            location: "",
            barcode: ""
        })
        onClose()
    }

    const isTypeDialog = type === "type"
    const dialogTitle = isTypeDialog ? "Opret ny type" : "Opret nyt objekt"

    return (
        <Dialog.Root open={isOpen} onOpenChange={({ open }) => !open && onClose()}>
            <Dialog.Backdrop />
            <Dialog.Positioner>
                <Dialog.Content maxW="md">
                    <Dialog.Header>
                        <Dialog.Title fontSize="lg" fontWeight="bold">
                            {dialogTitle}
                        </Dialog.Title>
                    </Dialog.Header>

                    <Dialog.Body>
                        <form onSubmit={handleSubmit}>
                            <VStack gap={4} align="stretch">
                                {/* Name Field */}
                                <Field.Root>
                                    <Field.Label>Navn *</Field.Label>
                                    <Input
                                        value={formData.name}
                                        onChange={(e) => handleInputChange("name", e.target.value)}
                                        placeholder={isTypeDialog ? "Indtast type navn" : "Indtast objekt navn"}
                                        required
                                    />
                                </Field.Root>

                                {/* Category Field - Only for Objects */}
                                {!isTypeDialog && (
                                    <Field.Root>
                                        <Field.Label>Kategori</Field.Label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => handleInputChange("category", e.target.value)}
                                            style={{
                                                width: '100%',
                                                padding: '8px 12px',
                                                border: '1px solid #e2e8f0',
                                                borderRadius: '6px',
                                                backgroundColor: 'white',
                                                fontSize: '14px'
                                            }}
                                        >
                                            <option value="">Vælg kategori</option>
                                            <option value="elektronik">Elektronik</option>
                                            <option value="møbler">Møbler</option>
                                            <option value="værktøj">Værktøj</option>
                                            <option value="kontorartikler">Kontorartikler</option>
                                            <option value="andet">Andet</option>
                                        </select>
                                    </Field.Root>
                                )}

                                {/* Stock Field - Only for Objects */}
                                {!isTypeDialog && (
                                    <Field.Root>
                                        <Field.Label>Lager antal</Field.Label>
                                        <Input
                                            type="number"
                                            value={formData.stock}
                                            onChange={(e) => handleInputChange("stock", e.target.value)}
                                            placeholder="Indtast antal på lager"
                                            min="0"
                                        />
                                    </Field.Root>
                                )}

                                {/* Location Field - Only for Objects */}
                                {!isTypeDialog && (
                                    <Field.Root>
                                        <Field.Label>Placering</Field.Label>
                                        <Input
                                            value={formData.location}
                                            onChange={(e) => handleInputChange("location", e.target.value)}
                                            placeholder="F.eks. Lager A, Reol 3, Hylde 2"
                                        />
                                    </Field.Root>
                                )}

                                {/* Barcode Field - Only for Objects */}
                                {!isTypeDialog && (
                                    <Field.Root>
                                        <Field.Label>Stregkode</Field.Label>
                                        <Input
                                            value={formData.barcode}
                                            onChange={(e) => handleInputChange("barcode", e.target.value)}
                                            placeholder="Scan eller indtast stregkode"
                                        />
                                    </Field.Root>
                                )}
                            </VStack>
                        </form>
                    </Dialog.Body>

                    <Dialog.Footer>
                        <HStack gap={3}>
                            <Button variant="outline" onClick={onClose}>
                                Annuller
                            </Button>
                            <Button
                                colorScheme="green"
                                onClick={handleSubmit}
                                disabled={!formData.name.trim() || isLoading}
                                loading={isLoading}
                            >
                                <LuPlus />
                                {isTypeDialog ? "Opret type" : "Opret objekt"}
                            </Button>
                        </HStack>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Positioner>
        </Dialog.Root>
    )
}
